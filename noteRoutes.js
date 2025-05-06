const express = require('express');
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
const Note = require('./noteModel');

const router = express.Router();

// Middleware to parse JSON
router.use(express.json());

// Retrieve all notes
router.get('/note', async (req, res) => {
  try {
    console.log('Retrieving all notes...');
    const notes = await Note.find({});
    if (!notes || notes.length === 0) {
      return res.status(404).json({ error: 'No notes found' });
    }
    res.status(200).json(notes);
  } catch (error) {
    console.error('Error retrieving notes:', error.message);
    res.status(500).json({ error: 'Failed to retrieve notes' });
  }
});


// Create a new note
router.post('/note', async (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ error: 'Title and content are required' });
  }

  try {
    const response = await axios.get('https://catfact.ninja/fact');
    const catfact = response.data?.fact || 'No cat fact available';

    const newNote = new Note({
      id: uuidv4(),
      title,
      content,
      catfact
    });

    await newNote.save();
    res.status(201).json(newNote);
  } catch (error) {
    console.error('Error creating note:', error.message);
    res.status(500).json({ error: 'Failed to create note' });
  }
});

// Delete a note
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await Note.deleteOne({ id });
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Note not found' });
    }
    res.status(200).json({ message: 'Note deleted successfully' });
  } catch (error) {
    console.error('Error deleting note:', error.message);
    res.status(500).json({ error: 'Failed to delete note' });
  }
});

// Search for a note
router.get('/search', async (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ error: 'Query parameter is required' });
  }

  try {
    const sanitizedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // Escape special regex characters
    const notes = await Note.find({
      $or: [
        { title: { $regex: sanitizedQuery, $options: 'i' } },
        { content: { $regex: sanitizedQuery, $options: 'i' } },
        { catfact: { $regex: sanitizedQuery, $options: 'i' } }
      ]
    });
    res.status(200).json(notes);
  } catch (error) {
    console.error('Error searching notes:', error.message);
    res.status(500).json({ error: 'Failed to search notes' });
  }
});

module.exports = router;
