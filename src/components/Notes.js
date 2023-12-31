import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";
import NoteItem from "./NoteItem";

function Notes() {
  const context = useContext(noteContext);
  const {notes, setNotes} = context;
  return (
    <div className = "row">
       <h2> Your Notes</h2>
        {notes.map((note) => {
          console.log(note.title)
          return <NoteItem note = {note} />;
        })}
    </div>
  )
}

export default Notes
