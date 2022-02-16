import React from 'react'
import { ReactComponent as ArrowLeft } from '../assets/arrow-left.svg'
import { Link, useParams} from "react-router-dom";

import { useEffect, useState } from 'react'

const NotePage = () => {
    let {id} = useParams()
    let noteId = id

    const [note,setNote] = useState(null)
    

    useEffect(()=>{
        getNote()
    },[noteId])

    let getNote = async ()=>{
        if (noteId === "new") return
        let response = await fetch(`/api/note/${noteId}`)
        let data = await response.json()
        // console.log(data)
        setNote(data)
    }

    let createNote = async ()=>{
        fetch(`/api/notes/`,{
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(note)
        }) 
    }

    let updateNote = async ()=>{
        fetch(`/api/note/${noteId}/`,{
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(note)
        }) 
    }

    let deleteNote = async ()=>{
        fetch(`/api/note/${noteId}/`,{
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            },
        }) 
    }

    let handleSubmit = ()=>{
        console.log("HandleSubmit", note)
        if (noteId!=="new" && note.body == ''){
            deleteNote()
        } else if ( noteId!=="new"){
            updateNote()
        } else if (noteId === "new" && note.body !== null){
            createNote()
        }
        
        //history.push('/')
    }

    let handleChange = (value) =>{
        setNote(note =>({...note, "body":value}))
        console.log("Handle Change" , value)
    }

  return (

    <div className='note'>
        <div className='note-header'>
            <h3>
                <Link to={"/"}>
                <ArrowLeft onClick={handleSubmit} />
                </Link>
            </h3>
            <Link to={"/"}>
            {noteId!=="new" ? 
            (<button onClick={deleteNote}>Delete</button>)
            :(<button onClick={handleSubmit}>Done</button>)}
            </Link>
        </div>

        <textarea onChange={(e)=> {handleChange(e.target.value)}} value={note?.body}></textarea>
        
            
    </div>
  )
}

export default NotePage