import React from 'react'
import { Link } from 'react-router-dom'

export default function NoteItem({note}) {
  return (
    <div className='note'>
      <Link to={`/Editor.jsx/${note.id}`} >
        <h4>{note.title.length > 25 ? 
            (note.title.substr(0, 25)+"...") : 
            note.title}
        </h4>
        <p>{note.date}</p>
      </Link>
    </div>
  )
}
