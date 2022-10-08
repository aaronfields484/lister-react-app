import React, {useState} from "react";
import AddIcon from '@material-ui/icons/Add';

function CreateArea(props) {
  const [isFocus, setFocus] = useState(false);

  function handleChange(){
    return setFocus(true);
  }

  function handleClick(){
    
    setFocus(false);
  }

  return (
    <div>
      <form>
        <input
          name="title"
          placeholder="Title"
          value={props.cTitle}
          onChange={props.handleChange}
          onFocus={handleChange}
          autoComplete="off"
        />
        <textarea
          name="content"
          placeholder="Take a note..."
          rows="3"
          value={props.cContent}
          onChange={props.handleChange}
          style={isFocus ? null : {display:'none'}}
        />
        <button style={isFocus ? null : {display:'none'}} onClick={props.handleClick}><AddIcon /></button>
      </form>
    </div>
  );
}

export default CreateArea;
