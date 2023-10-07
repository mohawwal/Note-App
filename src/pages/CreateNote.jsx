import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { BsFillArrowLeftCircleFill } from 'react-icons/bs'
import { v4 as uuid } from 'uuid'
import useCreateDate from '../component/useCreateDate'

export default function CreateNote({setNotes, darkMode}) {
  const [title, setTitle] =React.useState('')
  const [details, setDetails] =React.useState('')
  const [warningMsg, setWarningMsg] = React.useState('')
  const navigate = useNavigate()

  const date = useCreateDate()

  function handleSubmit(e) {
    e.preventDefault()
    if (title && details !== "") {
      const note = {id: uuid(), title, details, date}
      //add this note to the Note array
      setNotes(prevNotes => [note, ...prevNotes])
      //redirect to the home
      navigate('/')

    }else if(title === '' && details === '') {
      setWarningMsg('Add DETAILS and a TITLE')
    } else if (title === '') {
      setWarningMsg('Add a TITLE')
    }else if (details === '') {
      setWarningMsg('Add your DETAILS')
    }
    
  }

  return (
    <section>
        <header className='create__note'>
          <Link to="/" className={darkMode ? 'search__icon' : 'btn'}><BsFillArrowLeftCircleFill /></Link>
          <button className={darkMode ? 'save' : 'btn primary'} onClick={handleSubmit}>Save</button>
        </header>
        
        <form className="create-note" onSubmit={handleSubmit}>
          <input type="text" placeholder='Title' value={title} onChange={(e) => setTitle(e.target.value)} autoFocus />
          <p className='warningMsg'>{warningMsg}</p>
          <textarea rows="28" placeholder='Note details...' value={details} onChange={(e) => setDetails(e.target.value)}></textarea>
        </form>
    </section>
  )
}

