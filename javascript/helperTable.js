import { buildForm } from "./index.js";
import { notes, categories } from "./data.js";
import { archiveLogo, deleteLogo, editLogo, unArchiveLogo } from "./logo.js";
import { deleteNote, changeArchiveState } from "./helperNote.js";

export let archieveTable = document.getElementById("archieve-table"),
  notesTable = document.getElementById("notes-table"),
  deleteAll = document.getElementsByClassName("row-logo delete");
export let activeNoteTableShown = true;

export const updateTable = () => {
  clearAllTables();
  buildNotesTable();
  buildStatisticTable();
};

const clearAllTables = () => {
  clearInnerHTML(notesTable);
  clearInnerHTML(archieveTable);
};

export const clearInnerHTML = (parent) => {
  while (parent.firstChild) parent.removeChild(parent.firstChild);
};

export const buildStatisticTable = () => {
  let Ideas,
    Quotes,
    Tasks,
    Thoughts,
    IdeasActive,
    QuotesActive,
    TasksActive,
    ThoughtsActive;
  Ideas =
    Quotes =
    Tasks =
    Thoughts =
    IdeasActive =
    QuotesActive =
    TasksActive =
    ThoughtsActive =
      0;

  notes.forEach((note) => {
    if (note.category === "Idea") {
      Ideas++;
      if (!note.archived) IdeasActive++;
    }
    if (note.category === "Quote") {
      Quotes++;
      if (!note.archived) QuotesActive++;
    }
    if (note.category === "Task") {
      Tasks++;
      if (!note.archived) TasksActive++;
    }
    if (note.category === "Random Thought") {
      Thoughts++;
      if (!note.archived) ThoughtsActive++;
    }
  });

  archieveTable.innerHTML += Ideas
    ? buildStatTr("Idea", IdeasActive, Ideas)
    : ``;
  archieveTable.innerHTML += Quotes
    ? buildStatTr("Quote", QuotesActive, Quotes)
    : ``;
  archieveTable.innerHTML += Tasks
    ? buildStatTr("Task", TasksActive, Tasks)
    : ``;
  archieveTable.innerHTML += Thoughts
    ? buildStatTr("Random Thought", ThoughtsActive, Thoughts)
    : ``;
};

const buildStatTr = (category, active, total) => {
  return `
        <tr>
            <td className="category-icon stats-icon"><div class="back-color">${
              categories[category]
            }</div></td>
            <td className="category2">${category}</td>
            <td className="active">${active}</td>
            <td className="archived">${total - active}</td>
        </tr>
    `;
};

const buildNotesTable = () => {
  notes.forEach((note) => {
    if (!note.archived === activeNoteTableShown)
      notesTable.append(buildNotesTr(note));
  });
};

const buildNotesTr = (note) => {
  let tr = document.createElement("tr");
  tr.id = note.id;
  tr.innerHTML = `
            <td className="category-icon"><div class="back-color">${
              categories[note.category]
            }</div></td>
            <td className="name">${note.name}</td>
            <td className="created">${note.created}</td>
            <td className="category1">${note.category}</td>
            <td className="content">${note.content}</td>
            <td className="dates">${note.dates}</td>
    `;
  let tdEdit = document.createElement("td"),
    tdArchive = document.createElement("td"),
    tdDelete = document.createElement("td");

  tdEdit.className = "row-icon edit";
  tdEdit.title = "edit";
  tdEdit.addEventListener("click", () => {
    buildForm(note);
  });
  tdEdit.innerHTML = editLogo;

  tdArchive.className = "row-icon archive";
  tdArchive.title = "archive";
  tdArchive.addEventListener("click", () => {
    changeArchiveState(note);
  });
  tdArchive.innerHTML = activeNoteTableShown ? archiveLogo : unArchiveLogo;

  tdDelete.className = "row-icon delete";
  tdDelete.title = "delete";
  tdDelete.addEventListener("click", () => {
    deleteNote(note.id);
  });
  tdDelete.innerHTML = deleteLogo;

  tr.append(tdEdit, tdArchive, tdDelete);
  return tr;
};

[].forEach.call(deleteAll, (el) => {
  el.addEventListener("click", () => {
    notes.length = 0;
    updateTable();
  });
});

const switchTables = () => {
  activeNoteTableShown = !activeNoteTableShown;
  clearInnerHTML(notesTable);
  buildNotesTable();
  document.getElementById("messange").innerText = activeNoteTableShown
    ? "Active notes"
    : "Archived notes";
  document.getElementsByClassName("row-logo archive")[0].innerHTML =
    activeNoteTableShown ? archiveLogo : unArchiveLogo;
};

document
  .getElementById("archive-switch")
  .addEventListener("click", switchTables);
document.getElementById("create-button").addEventListener("click", buildForm);
