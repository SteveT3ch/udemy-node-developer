const fs = require('fs');
const { log } = console;

const orginalNote = {
  title: 'Some title',
  body: 'Some body'
};

const orginalNoteString = JSON.stringify(orginalNote);
fs.writeFileSync('note.json', orginalNoteString);

const noteString = fs.readFileSync('note.json');
const note = JSON.parse(noteString);
log(typeof note);
log(note.title);
log(note.body);
