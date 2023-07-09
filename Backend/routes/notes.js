const express = require("express");
const Notes = require("../models/Notes");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const fetchuser = require("../middleware/fetchuser");

// Route 1: Get all notes using: GET "api/notes/getNotes" .
router.get("/getNotes", fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(400).send({ error: "Some error occurred" });
  }
});

// Route 2: Add a  note using: POST "api/notes/addNote" .
router.post(
  "/addNote",
  fetchuser,
  [
    check("title", "Title cannot be empty").exists(),
    check("description", "Description should be 10 characters").isLength({
      min: 10,
    }),
    check("tag", "Add a tag to the note").exists(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
      }

      const { title, description, tag } = req.body;
      const note = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedNote = await note.save();
      res.json(savedNote);
    } catch (error) {
      console.error(error.message);
      res.status(400).send({ error: "Some error occurred" });
    }
  }
);

// Route 3: Update a  note using: PUT "api/notes/updateNote/:id" .
router.put(
  "/updateNote/:id",
  fetchuser,
  [
    check("title", "Title cannot be empty").exists(),
    check(
      "description",
      "Description should be atleast 10 characters"
    ).isLength({ min: 10 }),
    check("tag", "Add a tag to the note").exists(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
      }

      const { title, description, tag } = req.body;

      //Create  anew Note object
      const newNote = {};
      if (title) {
        newNote.title = title;
      }
      if (description) {
        newNote.description = description;
      }
      if (tag) {
        newNote.tag = tag;
      }

      ///Find the note to update and update it
      let note = await Notes.findById(req.params.id);
      if(!note) {
        return res.status(404).send('Note not found');
      }

      if(note.user.toString() !== req.user.id){
        return res.status(401).send('Unautorized Request');
      }
      
      note = await Notes.findByIdAndUpdate(req.params.id, {$set: newNote}, {new : true} )
      res.json(note);

    } catch (error) {
      console.error(error.message);
      res.status(400).send({ error: "Some error occurred" });
    }
  }
);

module.exports = router;


//4. Delete a note using DELETE . /api/notes/delete/:id
router.delete('/deletenote/:id', fetchuser, async (req, res) => {

    try {
        ///Find the note to update and update it
        let note = await Notes.findById(req.params.id);
        if(!note) {
        return res.status(404).send('Note not found');
        }

        if(note.user.toString() !== req.user.id){
        return res.status(401).send('Unautorized Request');
        }

        note = await Notes.findByIdAndDelete(req.params.id);

        res.json({"Message" : "Success, note has been deleted"})
    } catch (error) {
        console.error(error.message);
        res.status(400).send({ error: "Some error occurred" });
    }

    

})
