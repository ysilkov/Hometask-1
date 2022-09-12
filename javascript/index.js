import { notes, categories } from './data.js';
import { createNote, updateNote, deleteNote, changeArchiveState } from './helperNote.js';
import { archiveLogo, deleteLogo, editLogo, unArchiveLogo } from './logo.js';
/* import { makeRandomID, getDatesFromText } from "./randomID.js"; */



//svg icons to styled
export const loadIconsIntoHeader = ()=> {
    Array.from(document.getElementsByClassName('header-icon')).forEach(col => {
        if (col.classList.contains('archive'))
            col.innerHTML = archiveLogo;
        if (col.classList.contains('delete'))
            col.innerHTML = deleteLogo;
    });
}

//Note

//announcer
export const showAnnouncer = (text, error) => {
    let announcer = document.getElementById('announcer')
    announcer.style.opacity = '1';
    announcer.innerText = text;
    if (error)
        announcer.classList.add('invalid-input');
    setTimeout(() => {
        announcer.style.opacity = '0';
        if (error)
            announcer.classList.remove('invalid-input');
    }, 1500);
}

export const buildForm = (note) => {
    let form = document.createElement('form');

    form.innerHTML = `
        <input type="text" name="name" value="${typeof note.name === "string" ? note.name : ''}" placeholder="Name" required>
        <select name="categories">
        ` + Object.keys(categories).map(elem => `<option value="${elem}" ${note.category === elem ? 'selected' : ''}>${elem}</option>`) + `
        </select>
        <textarea name="content" placeholder="Content">${note.content ? note.content : ''}</textarea>
        <input class="cancel" type="button" value="Cancel">
        <input id="submit-button" type="submit" value="Submit" > 
    `;
    form.getElementsByClassName('cancel')[0].addEventListener("click", () => {
        document.getElementsByClassName('wrapper-div')[0].remove();
    });
const month = ["January", "February","March", "April", "May", "June", "July", "August", "September", "October", 
"November", "December"]
    form.onsubmit = (event) => {
        event.preventDefault();
        let newNote = {
            id: (typeof note.name === "string") ? note.id : new Date().getTime(),
            name: event.target.name.value,
            created: (typeof note.name === "string") ? note.created : `${month[new Date().getMonth()]} ${new Date().getDate()}, ${new Date().getFullYear()}`,
            category: event.target.categories.value,
            content: event.target.content.value,
            dates: "",
            archived: (typeof note.name === "string") ? note.archived : false
        }

        if (typeof note.name === "string")
            updateNote(newNote);
        else
            createNote(newNote);

        document.getElementsByClassName('wrapper-div')[0].remove();
    };


    let wrapperDiv = document.createElement('div');
    wrapperDiv.className = 'wrapper-div';
    wrapperDiv.append(form);

    document.body.prepend(wrapperDiv);
}

//table
