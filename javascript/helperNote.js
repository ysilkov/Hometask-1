import { notes } from "./data.js";
import {
    updateTable,
  clearInnerHTML,
  archieveTable,
  buildStatisticTable,
  activeNoteTableShown,
} from "./helperTable.js";
import { showMessage } from "./index.js";

export const createNote = (note) => {
  notes.push(note);
  updateTable();
  showMessage("Note created");
};

export const updateNote = (note) => {
  try {
    let index = notes.findIndex((n) => n.id === note.id);
    if (index < 0) throw "There is no such note!";
    notes.splice(index, 1, note);
    updateTable();
    showMessage ("Note updated");
  } catch (e) {
    console.error(e);
    showMessage("Note wasn't updated", true);
  }
};

export const deleteNote = (noteID) => {
  try {
    let index = notes.findIndex((n) => n.id === noteID);
    if (index < 0) throw "There is no such note!";
    notes.splice(index, 1);
    document.getElementById(noteID).remove();
    clearInnerHTML(archieveTable);
    buildStatisticTable();
    showMessage("Note deleted");
  } catch (e) {
    console.error(e);
    showMessage ("Note wasn't updated!", true);
  }
};

export const changeArchiveState = (note) => {
  notes[notes.findIndex((n) => n.id === note.id)].archived =
    !notes[notes.findIndex((n) => n.id === note.id)].archived;
    updateTable ();
    showMessage(
    `Note ${activeNoteTableShown ? "archived" : "unarchived"}`
  );
};
