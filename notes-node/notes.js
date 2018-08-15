const { log } = console;
const path = require('path');
const fs = require('fs');
const faker = require('faker');
log(`Starting app ${path.basename(__filename)}`);

const fetchNotes = () => {
  try {
    let notesString = fs.readFileSync('note-data.json');
    return JSON.parse(notesString);
  } catch (e) {
    return [];
  }
};

const saveNotes = (notes) => {
    fs.writeFileSync('note-data.json',JSON.stringify(notes));
};

const addNote = (title, body) => {
  let notes = fetchNotes();
  let note = {
    title,
    body,
  };
  const duplicateNotes = notes.filter((note) => note.title === title);

  if (duplicateNotes.length === 0){
    notes.push(note);
    saveNotes(notes);
    log(note);
    return note;
  }
};
const getAll = () => {
  log('Getting all notes');
  return fetchNotes();
};

const readNote = (title) => {
  log(`Reading notes: ${title}`);
  let notes = fetchNotes();
  let filteredNotes = notes.filter((note) => note.title === title);
  return filteredNotes[0];
};

const removeNote = (title) => {
  log(`Removing note: ${title}`);
  let notes = fetchNotes();
  let filteredNotes = notes.filter((note) => note.title !== title);
  saveNotes(filteredNotes);
  return notes.length === filteredNotes;
};

const logNote = (note) => {
  debugger;
  log('---');
  log(`Title: ${note.title}`);
  log(`Body: ${note.body}`);
};
module.exports = {
  addNote,
  getAll,
  readNote,
  removeNote,
  logNote
};
