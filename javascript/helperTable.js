
let statisticsTable = document.getElementById('stats-table'),
notesTable = document.getElementById('active-archive-table'),
activeNoteTableShown = true;

export const refreshTables = ()=> {
    clearAllTables();
    buildNotesTable();
    buildStatisticTable();
}

function clearAllTables() {
    clearInnerHTML(notesTable);
    clearInnerHTML(statisticsTable);
}

function clearInnerHTML(parent) {
    while (parent.firstChild)
        parent.removeChild(parent.firstChild);
}

function buildStatisticTable() {
    let Ideas, Quotes, Tasks, Thoughts, IdeasActive, QuotesActive, TasksActive, ThoughtsActive;
    Ideas = Quotes = Tasks = Thoughts = IdeasActive = QuotesActive = TasksActive = ThoughtsActive = 0;

    notes.forEach(note => {
        if (note.category === 'Idea') {
            Ideas++;
            if (!note.archived)
                IdeasActive++;
        }
        if (note.category === 'Quote') {
            Quotes++;
            if (!note.archived)
                QuotesActive++;
        }
        if (note.category === 'Task') {
            Tasks++;
            if (!note.archived)
                TasksActive++;
        }
        if (note.category === 'Random Thought') {
            Thoughts++;
            if (!note.archived)
                ThoughtsActive++;
        }
    });

    statisticsTable.innerHTML += (Ideas) ? buildStatTr('Idea', IdeasActive, Ideas) : ``;
    statisticsTable.innerHTML += (Quotes) ? buildStatTr('Quote', QuotesActive, Quotes) : ``;
    statisticsTable.innerHTML += (Tasks) ? buildStatTr('Task', TasksActive, Tasks) : ``;
    statisticsTable.innerHTML += (Thoughts) ? buildStatTr('Random Thought', ThoughtsActive, Thoughts) : ``;
}

function buildStatTr(category, active, total) {
    return `
        <tr>
            <td className="category-icon stats-icon"><div class="back-color">${categories[category]}</div></td>
            <td className="category2">${category}</td>
            <td className="active">${active}</td>
            <td className="archived">${total - active}</td>
        </tr>
    `;
}

function buildNotesTable() {
    notes.forEach(note => {
        if (!note.archived === activeNoteTableShown)
            notesTable.append(buildNotesTr(note));
    })
}

function buildNotesTr(note) {
    let tr = document.createElement('tr');
    tr.id = note.id;
    tr.innerHTML = `
            <td className="category-icon"><div class="back-color">${categories[note.category]}</div></td>
            <td className="name">${note.name}</td>
            <td className="created">${note.created}</td>
            <td className="category1">${note.category}</td>
            <td className="content">${note.content}</td>
            <td className="dates">${note.dates}</td>
    `;
    let tdEdit = document.createElement('td'),
        tdArchive = document.createElement('td'),
        tdDelete = document.createElement('td');

    tdEdit.className = "row-icon edit";
    tdEdit.addEventListener("click", () => { buildForm(note) });
    tdEdit.innerHTML = editLogo;

    tdArchive.className = "row-icon archive";
    tdArchive.addEventListener("click", () => { changeArchiveState(note) });
    tdArchive.innerHTML = (activeNoteTableShown) ? archiveLogo : unArchiveLogo;

    tdDelete.className = "row-icon delete";
    tdDelete.addEventListener("click", () => { deleteNote(note.id) });
    tdDelete.innerHTML = deleteLogo;

    tr.append(tdEdit, tdArchive, tdDelete);
    return tr;
}


function switchTables() {
    activeNoteTableShown = !activeNoteTableShown;
    clearInnerHTML(notesTable);
    buildNotesTable();
    document.getElementById('table-name').innerText = activeNoteTableShown ? "Active notes" : "Archived notes";
    document.getElementsByClassName('header-icon archive')[0].innerHTML = (activeNoteTableShown) ? archiveLogo : unArchiveLogo;
}


document.getElementById("table-switcher").addEventListener("click", switchTables);
document.getElementById("create-note-button").addEventListener("click", buildForm);