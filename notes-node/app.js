const { log } = console;
const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js');

const titleOptions = {
  describe: 'Title of note',
  demand: true,
  alias: 't'
};

const bodyOptions = {
  describe: 'Body of note',
  demand: true,
  alias: 'b'
}

// notes.addNote();
const argv = yargs
  .command('add', 'Add a new note', {
    title: titleOptions,
    body: bodyOptions,
  })
  .command('list', 'List notes', {
    title: titleOptions,
  })
  .command('read', 'read notes', {
    title: titleOptions,
  })
  .command('remove', 'remove notes', {
    title: titleOptions,
  })
  .help()
  .argv;
const command = argv._[0];

// log(`Command: ${command}`);
// log(`Yargs ${argv}`);

if(command === 'add'){
  const note = notes.addNote(argv.title, argv.body);
  if(note){
    log('Note Created');
    notes.logNote(note);
  }else {
    log('Duplicate Title');
  }
}else if (command === 'list') {
  let allNotes = notes.getAll();
  log(`Printing ${allNotes.length} note(s)`);
  allNotes.map((note) => notes.logNote(note));
}else if (command === 'read'){
  let note = notes.readNote(argv.title);
  if (note) {
      log('Note found');
      notes.logNote(note);
  }else {
      log('Notes not found');
  }
}else if (command === 'remove'){
  let noteRemoved = notes.removeNote(argv.title);
  let msg = noteRemoved ? `Note "${title}" was removed` : 'Note not found'
  log(msg);
}else {
  log('Not Avaliable');
}
