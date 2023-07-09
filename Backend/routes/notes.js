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
router.post("/addNote",fetchuser,
  [
    check("title", "Title cannot be empty").exists(),
    check("description", "Description should be 10 characters").isLength({ min: 10,}),
    check("tag", "Add a tag to the note").exists(),
  ],async (req, res) => {
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

module.exports = router;