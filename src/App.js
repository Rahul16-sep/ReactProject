
import './App.css';
import About from './components/About';
import Home from './components/Home';
import Navbar from './components/Navbar';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NoteState from './context/notes/NoteState';

function App() {
  return (
    <>
    <NoteState >
    <div className="App">
      <BrowserRouter>
      <Navbar />
        <Routes>
          <Route exact path = '/home' element = {<Home />}/>
          <Route exact path = '/about' element = {<About />}/>
        </Routes>
      </BrowserRouter>
      
    </div>
    </NoteState>
    </>
  );
}

export default App;
