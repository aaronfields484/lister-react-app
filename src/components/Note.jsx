import React from "react";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import ClearIcon from '@material-ui/icons/Clear';

function Note(props) {

  return (
    <div className="note" id={props.id}>
      <input className="inputTitle" name="noteTitle" onChange={props.handleChange} value={props.title} disabled={!props.isEditable} />
      <input className="inputContent" name="noteContent" onChange={props.handleChange} value={props.content} disabled={!props.isEditable} />
      <button
        onClick={() => {
          props.handleClick(props.id);
        }}
      >
        <DeleteIcon />
      </button>
      <button 
        onClick={() => {
          props.toggleEdit(props.id);
        }}>{props.isEditable ? <ClearIcon/> : <EditIcon />}</button>
    </div>
  );
}

export default Note;
