
import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {

    const noteInitial = [
        {
        "_id": "64b386d33cb59ed6928d8778",
        "user": "64a8fb45e01afe231383d5d9",
        "title": "A note",
        "description": "My First Note for testing new one",
        "tag": "Personal",
        "date": "2023-07-16T05:57:39.448Z",
        "__v": 0
      },
      {
        "_id": "64b3871b3cb59ed6928d877b",
        "user": "64a8fb45e01afe231383d5d9",
        "title": "Invitation Detalis",
        "description": "Start writing the people name, whom you want to invite in Riya's wedding.",
        "tag": "Personal",
        "date": "2023-07-16T05:58:51.756Z",
        "__v": 0
      },
      {
        "_id": "64b386d33cb59ed6928d8778",
        "user": "64a8fb45e01afe231383d5d9",
        "title": "A note",
        "description": "My First Note for testing new one",
        "tag": "Personal",
        "date": "2023-07-16T05:57:39.448Z",
        "__v": 0
      },
      {
        "_id": "64b3871b3cb59ed6928d877b",
        "user": "64a8fb45e01afe231383d5d9",
        "title": "Invitation Detalis",
        "description": "Start writing the people name, whom you want to invite in Riya's wedding.",
        "tag": "Personal",
        "date": "2023-07-16T05:58:51.756Z",
        "__v": 0
      },
      {
        "_id": "64b386d33cb59ed6928d8778",
        "user": "64a8fb45e01afe231383d5d9",
        "title": "A note",
        "description": "My First Note for testing new one",
        "tag": "Personal",
        "date": "2023-07-16T05:57:39.448Z",
        "__v": 0
      },
      {
        "_id": "64b3871b3cb59ed6928d877b",
        "user": "64a8fb45e01afe231383d5d9",
        "title": "Invitation Detalis",
        "description": "Start writing the people name, whom you want to invite in Riya's wedding.",
        "tag": "Personal",
        "date": "2023-07-16T05:58:51.756Z",
        "__v": 0
      }

    ]
    
    const [notes, setNotes] = useState(noteInitial);
    return (
        <NoteContext.Provider value={{notes, setNotes}}>
            {props.children} 
        </NoteContext.Provider>
      );

} 


export default NoteState;

