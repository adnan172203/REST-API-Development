const { validationResult } = require('express-validator');

//models
const Note = require('../models/notes');

//add note controller

module.exports.addNoteController = async (req, res) => {
  const note = new Note({
    ...req.body,
    owner:req.user._id
  });

  try {
    await note.save();
    res.send(note);
  } catch (err) {
    res.status(500).send(err);
  }
};

//get note controller

module.exports.getNoteController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(404).send(errors.array());
  }
  try {
    const id = req.params.noteId;
    const note = await Note.findById(id).populate('owner');
    if (!note) return res.status(404).send('No Note Found!!');
    res.send(note);
  } catch (err) {
    res.status(500).send(err);
  }

  // const noteId = parseInt(req.params.noteId);

  // const note = notes.find(note => note.id === noteId);

  // if(note) return res.send(note);
  // res.status(404).send('not available');
};

//get all notes

module.exports.getNotesController = async (req, res) => {
  try {
    const notes = await Note.find();
    res.send(notes);
  } catch (err) {
    res.status(500).send(err);
  }
};

//update note

module.exports.updateNoteController = async (req, res) => {
  const id = req.params.noteId;
  const noteInput = req.body;
  const gotNoteInput = Object.keys(noteInput);
  const allowedUpdates = ['title', 'description'];
  const isAllowed = gotNoteInput.every(update =>
    allowedUpdates.includes(update)
  );
  if (!isAllowed) {
    return res.status(400).send('Invalid Updates');
  }

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(404).send(errors.array());
  }

  try {
    const note = await Note.findOneAndUpdate({
      _id:id,
      owner: req.user._id
    },id, req.body, {
      new: true,
      runValidators: true
    });
    //if note not found
    if (!note) return res.status(404).send('Note not found');
    res.send(note);
  } catch (err) {
    res.status(500).send(err);
  }

  // const noteId = parseInt(req.params.noteId);
  // const noteInput = req.body;
  // const note = notes.find(note => note.id === noteId);

  // const gotNoteInput = Object.keys(noteInput);
  // const allowedUpdates = ['title', 'description'];
  // const isAllowed = gotNoteInput.every(update => allowedUpdates.includes(update));

  // if( !isAllowed ){
  //   return res.status(400).send('Invalid operation');
  // }

  // if(note){
  //   notes = notes.map(note => {
  //     if( note.id === noteId ){
  //       return {
  //         ...note,
  //         ...noteInput
  //       }
  //     }else {
  //       return note;
  //     }
  //   })
  //   return res.send(notes);
  // }else{
  //   return res.status(404).send('note not found');
  // }
};

//delete note

module.exports.deleteNoteController = async (req, res) => {
  const id = req.params.noteId;
  const errors = validationResult(req);
  if (!errors) res.status(404).send(errors.array());

  try {
    const note = await Note.findOneAndDelete({
      _id:id,
      owner: req.user._id
    });

    if (!note) return res.status(404).send('Note not found');

    res.send(note);
  } catch (err) {
    res.status(500).send(err);
  }

  // const noteId = parseInt(req.params.noteId);
  // const note = notes.find(note => note.id === noteId);

  // if (note) {
  //   notes = notes.filter(note => note.id !== noteId);
  //   res.send(notes);
  // } else {
  //   res.status(404).send('note not found or unable to update');
  // }
};
