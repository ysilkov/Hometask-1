import { notes } from "./data.js";
import {
  refreshTables,
  clearInnerHTML,
  statisticsTable,
  buildStatisticTable,
  activeNoteTableShown,
} from "./helperTable.js";
import { showAnnouncer } from "./index.js";

export const createNote = (note) => {
  notes.push(note);
  refreshTables();
  showAnnouncer("Note created successfully!");
};

export const updateNote = (note) => {
  try {
    let index = notes.findIndex((n) => n.id === note.id);
    if (index < 0) throw "There is no such note!";
    notes.splice(index, 1, note);
    refreshTables();
    showAnnouncer("Note updated successfully!");
  } catch (e) {
    console.error(e);
    showAnnouncer("Note wasn't updated!", true);
  }
};

export const deleteNote = (noteID) => {
  try {
    let index = notes.findIndex((n) => n.id === noteID);
    if (index < 0) throw "There is no such note!";
    notes.splice(index, 1);
    document.getElementById(noteID).remove();
    clearInnerHTML(statisticsTable);
    buildStatisticTable();
    showAnnouncer("Note deleted successfully!");
  } catch (e) {
    console.error(e);
    showAnnouncer("Note wasn't updated!", true);
  }
};

export const changeArchiveState = (note) => {
  notes[notes.findIndex((n) => n.id === note.id)].archived =
    !notes[notes.findIndex((n) => n.id === note.id)].archived;
  refreshTables();
  showAnnouncer(
    `Note ${activeNoteTableShown ? "archived" : "unarchived"} successfully!`
  );
};
