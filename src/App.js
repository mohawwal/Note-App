import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Note from './pages/Note';
import CreateNote from './pages/CreateNote';
import Editor from './pages/Editor';
import './index.css'



function App() {
  const [notes, setNotes] = useState(JSON.parse(localStorage.getItem('notes')) || [])

  const [darkMode, setDarkMode] = React.useState(true)

  const toggleMode = () => {
    setDarkMode(prevDarkMode => !prevDarkMode)
  }

  useEffect(() => {
    if(darkMode) {
      document.body.classList.add('darkModes')
    }else {
      document.body.classList.remove('darkModes')
    }
  }, [darkMode])

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes))
  }, [notes])

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Note notes={notes} toggleMode={toggleMode} darkMode={darkMode} />} />
          <Route path='/CreateNote.jsx' element={<CreateNote setNotes={setNotes} darkMode={darkMode} />} />
          <Route path='/Editor.jsx/:id' element={<Editor notes={notes} setNotes={setNotes} darkMode={darkMode} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
