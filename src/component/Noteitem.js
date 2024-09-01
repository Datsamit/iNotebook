import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext';

const Noteitem = (props) => {
    const context = useContext(noteContext);
    const { deleteNote } = context;
    const { note, updateNote } = props;
    return (
        <div className="col-md-4">
            <div className="card my-3 p-1.5 bg ">
                <div className="card-body">
                    <u><h4>{note.tag}</h4></u>
                    <h5 className="card-title p-2">{note.title}</h5>
                    <i className="fa-sharp fa-solid fa-trash mx-2 btn btn-secondary" onClick={() => { deleteNote(note._id); props.showAlert("Deleted Successfully", "success") }}></i>
                    <i className="fa-regular fa-pen-to-square mx-2 btn btn-secondary" onClick={() => {
                        updateNote(note)
                    }}></i>
                    <p className="card-text py-3">{note.description}</p>
                </div>
                
            </div>
        </div>

        
    )
}

export default Noteitem
