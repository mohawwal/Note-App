import React, { useEffect } from 'react'
import { CiSearch } from 'react-icons/ci';
import { Link } from 'react-router-dom';
import { IoIosCloseCircle } from 'react-icons/io'
import NoteItem from '../component/NoteItem';
import { GrAddCircle } from 'react-icons/gr'

export default function Note({notes,  toggleMode, darkMode}) {
  const [showSearch, setShowSearch] = React.useState(true)
  const [text, setText] = React.useState('')
  const [filteredNotes, setFilteredNotes] = React.useState(notes)

  function onToggle() {
    setShowSearch(prevShowSearch => !prevShowSearch)
  }

  const handleSearch = () => {
    setFilteredNotes(notes.filter((note) => {
      if(note.title.toLowerCase().match(text.toLowerCase())) {
        return note;
      }
    }))
  }

  useEffect(handleSearch, [text])

  return (
    <section className='note__section'>
        <header className='notes__header'>
          {showSearch ? <h2>All Notes</h2> : ""}
          {showSearch ? "" : <input type="text" autoFocus placeholder='KeyWord...' className='search__click' value={text} onChange={(e) => {setText(e.target.value); handleSearch();}} />}
          <button className={darkMode ? 'search__icon' : 'btn'} onClick={onToggle}> {showSearch ? <CiSearch /> : <IoIosCloseCircle />}</button>
        </header>
        <div className='flip'>
            <p className={darkMode ? 'darkMode light' : 'light'}>Light</p>
            <div className={darkMode ? 'darkMode flipBox' : 'flipBox'} onClick={toggleMode}>
                <span className={darkMode ? 'darkMode span' : 'span'}></span>
            </div>
            <p className={darkMode ? 'darkMode dark': 'dark'}>Dark</p>
        </div>
        <div className="notes__container">
          {
            filteredNotes.map((note) => 
              <NoteItem 
                note={note}
                key={note.id} 
              />
            )
          }
        </div>
        <div className='add__icon'><Link to="./CreateNote.jsx" className='add__btn'><GrAddCircle /></Link></div>
    </section>
  )
}
