import React from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { BsFillArrowLeftCircleFill } from 'react-icons/bs'
import { AiFillDelete } from 'react-icons/ai'
import useCreateDate from '../component/useCreateDate';

export default function Editor({notes, setNotes, darkMode}) {
  const {id} = useParams();
  const note = notes.find((item) => item.id === id)

  const [title, setTitle] = React.useState(note.title)
  const [details, setDetails] = React.useState(note.details)
  
  const navigate = useNavigate( )
  const date = useCreateDate()
  console.log(note)
  const [warningMsg, setWarningMsg] = React.useState('')


  const handleSubmit = (e) => {
    e.preventDefault();

    if(title && details) {
      const newNote = {...note, title, details, date}

      const newNotes = notes.map((item) => {
        if(item.id === id) {
          item = newNote
        }
        return item;
      })
      setNotes(newNotes)
      navigate('/')
    } else if(title === '' && details === '') {
      setWarningMsg('Add DETAILS and a TITLE')
    } else if (title === '') {
      setWarningMsg('Add a TITLE')
    }else if (details === '') {
      setWarningMsg('Add your DETAILS')
    }
    
  }

  const handleDelete = () => {
    const newNotes = notes.filter((item) => item.id != id);
    setNotes(newNotes)
    navigate('/')
  }

  return (
    <section className='editor'>
        <header className='create__note'>
          <Link to="/" className={darkMode ? 'search__icon' : 'btn'}><BsFillArrowLeftCircleFill /></Link>
          <button className={darkMode ? 'save' :'btn primary'} onClick={handleSubmit}>Save Note</button>
          <button className={darkMode ? 'search__icon' : 'btn danger'} onClick={handleDelete}><AiFillDelete /></button>
        </header>
        <form className="create-note" onSubmit={handleSubmit}>
          <input type="text" placeholder='Title' value={title} onChange={(e) => setTitle(e.target.value)} autoFocus />
          <p className='warningMsg'>{warningMsg}</p>
          <textarea rows="28" placeholder='Note details...' value={details} onChange={(e)=> setDetails(e.target.value)} ></textarea>
        </form>
    </section>
  )
}
 
