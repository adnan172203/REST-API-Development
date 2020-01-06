const express = require('express');
const router = express.Router();

const { check } = require('express-validator');

//controller
const {
    addNoteController,
    getNoteController,
    getNotesController,
    updateNoteController,
    deleteNoteController
  } = require('../controllers/noteController');  


//get notes route
router.get('/', getNotesController);

//get single note route
router.get( '/:noteId', check('noteId', 'Note not found').isMongoId(), getNoteController );

//adding note
router.post('/', addNoteController);

//update note
router.put(
  '/:noteId',
  [
    check('noteId', 'Note not found').isMongoId(),
    check('title', 'title is required')
      .optional()
      .notEmpty(),
    check('description', 'description is required')
      .optional()
      .notEmpty()
  ],
  updateNoteController
);

//deleting note

router.delete( '/:noteId', check('noteId', 'Note not found').isMongoId(), deleteNoteController);


module.exports = router;