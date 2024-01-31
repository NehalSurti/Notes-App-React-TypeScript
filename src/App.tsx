import { useState } from 'react';
import './App.css';
import AddNote from './components/AddNote/AddNote';
import Note from "./components/Note/Note"
import { Notes } from './components/Note/data';
import { NoteType } from './components/Note/noteType';

function App() {
  const[notes,setNotes] = useState(Notes);
  const addNote = (note:NoteType) => {
    setNotes([note,...notes])
  }
  return (
    <div className="App">
      <h2>Notes App</h2>
      <AddNote addNote={addNote}></AddNote>
      {notes.map((note)=>{
        return <Note key={note.id} text={note.text} priority={note.priority}></Note>
      })}
      
    </div>
  );
}

export default App;
