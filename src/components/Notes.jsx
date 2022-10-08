import React, { useState, useEffect } from "react";
import Note from "./Note";
import CreateArea from "./CreateArea";

function Notes(){

    const [items, setItems] = useState(()=> {

    const saved = localStorage.getItem("notes");
    if(saved) {
      const initialValue = JSON.parse(saved);
      return initialValue;
    }
    return "";
  });

    const [currentItems, setCurrentItems] = useState(({
      title: "",
      content: ""
    }));

    const [isEditable, setEdit] = useState(false);
    const [editableNote, setEditableNote] = useState({
      id: null,
      noteTitle: "",
      noteContent: ""
    });
    
    useEffect(()=> {

      localStorage.setItem('notes', JSON.stringify(items));
    }, [items]);
  
    function addItem(event) {
  
  
      const {title, content} = currentItems;
      
      setItems((prevValue) => {
        return [
          ...prevValue,
          {
            title: title,
            content: content
          }
        ];
      });
  
      setCurrentItems({
        title: "",
        content: ""
      });
  
      event.preventDefault();
  
    }
  
    function deleteItem(id) { 

      setItems((prevValue)=>{
        return prevValue.filter((note, index) => {
          return index !== id;
        });
      }); 
  
    }

    function handleChange(event) {
        const { name, value } = event.target;
    
        setCurrentItems((prevValue) => {
          return {
            ...prevValue,
            [name]: value
          };
        });
      }

    // Handle Edit changes
    function handleEditChange(event) {

        const { name, value } = event.target;

        setEditableNote((prevValue) => {
          return {
            ...prevValue,
            [name]: value
          };
        });
    
      }

    function toggleEdit(id) {
      
      if(!isEditable) {
      items.map((note, index)=> {

        if(index === id) {
        setEditableNote(
          {
            id: id,
            noteTitle: note.title,
            noteContent: note.content
          });
        }
        return 0;
      });
    }
    else {

        setItems((prevValue)=>{
          return prevValue.map((notes, index)=> {
            if(index === id) {
              return(
                {
                  title: editableNote.noteTitle,
                  content: editableNote.noteContent
                }
              );
            }
            return notes;
          });
        }); 

        setEditableNote(
          {
            id: null,
            noteTitle: "",
            noteContent: ""
          });
    }
      setEdit(!isEditable);
    }

return(
<div>
<CreateArea
        title={currentItems.title}
        content={currentItems.content}
        handleChange={handleChange}
        handleClick={addItem}
        cTitle={currentItems.title}
        cContent={currentItems.content}
      />
    
<div className="notes">
      {items ? items.map((item, index) => {

        return (
          <Note
            key={index}
            id={index}
            title={index === editableNote.id ? editableNote.noteTitle : item.title}
            content={index === editableNote.id ? editableNote.noteContent : item.content}
            handleClick={deleteItem}
            toggleEdit={toggleEdit}
            handleChange={handleEditChange}
            isEditable={index === editableNote.id ? isEditable : false}
          />
        );
      })
      : null}
</div>
</div>
    );
}

export default Notes;