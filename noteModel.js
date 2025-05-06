const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  id: { type: String, unique: true, required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  catfact: { type: String, required: true }
});

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;
