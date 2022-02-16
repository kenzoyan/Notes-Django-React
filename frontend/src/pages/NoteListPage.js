import React  from 'react'

import ListItem from '../components/ListItem'
import { useEffect, useState } from 'react'
import AddButton from '../components/AddButton'


const NoteListPage = () => {

    const [notes,setNotes] = useState([])


    useEffect(()=>{
        getnotes()
    },[])

    let getnotes = async ()=>{
        let response = await fetch("/api/notes/")
        let data = await response.json()
        console.log(data)
        setNotes(data)
    }

    return (
        <div className='notes'>
            <div className='notes-header'>
                <h2 className='notes-title'> &#9782; Notes</h2>
                <p className="notes-count">{notes.length}</p>
            </div>

            <div className='notes-list'>
                {notes.map((note,index)=>(
                    <ListItem key={index} note={note} />
                ))}
            </div>
            <AddButton/>
        </div>
    )
}

export default NoteListPage