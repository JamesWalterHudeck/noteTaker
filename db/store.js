const util = require('util')
const fs = require('fs')
const uuidv1 = require('uuidv1')

const readFileAsync = util.promisify(fs.readFile)
const writeFileAsync = util.promisify(fs.writeFile)

class Store {
  constructor() {
    this.id = 0;
  }
  read() {
    return readFileAsync("./db/db.json", "utf8")
  }

  write(note) {
    return writeFileAsync("./db/db.json", JSON.stringify(note))
  }

  getNotes() {
    return this.read().then(notes => {
      let notesObject = JSON.parse(notes);
      return notesObject;
    });
  };

  addNote(note) {
    const { title, text } = note;
    const newNote = { title, text, id: ++this.id };

    return this.getNotes()
      .then(notes => [...notes, newNote])
      .then(updatedNotes => this.write(updatedNotes))
      .then(() => newNote);
  }

  removeNote(id) {
    return this.getNotes()
      .then(notes => notes.filter(note => note.id !== parseInt(id)))
      .then(filteredNotes => this.write(filteredNotes));
  }

}

module.exports = new Store()