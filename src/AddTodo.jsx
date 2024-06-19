import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addTodo, updateTodo } from "./todoSlice";
import Swal from 'sweetalert2';
import "./addTodo.css"

const AddTodo = ({ handleClose, currentTodo }) => {
  const [text, setText] = useState(currentTodo ? currentTodo.text : "");
  const [choose, setChoose] = useState(currentTodo ? (currentTodo.completed ? "Completed" : "Incompleted") : "Incompleted");
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentTodo) {
      setText(currentTodo.text);
      setChoose(currentTodo.completed ? "Completed" : "Incompleted");
    }
  }, [currentTodo]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (text.trim()) {
      if (currentTodo) {
        dispatch(updateTodo({ ...currentTodo, text, completed: choose === "Completed" }));
        Swal.fire('Updated!', 'Your todo has been updated.', 'success');
      } else {
        dispatch(addTodo({ text, completed: choose === "Completed" }));
        Swal.fire('Added!', 'Your todo has been added.', 'success');
      }
      setText("");
      setChoose("Incompleted");
      handleClose();
    } else {
      Swal.fire('Please enter a valid todo.');
    }
  };

  return (
    <div className="Addbutton">
      <form onSubmit={handleSubmit}>
        <label>Title</label><br/>
        <input type="text" value={text} onChange={(e) => setText(e.target.value)}/>
        <br/><br/>
        <label>Status</label><br/>
        <select name='choose' id='choose' value={choose} onChange={(e) => setChoose(e.target.value)}>
           <option value="Incompleted">Incomplete</option>
           <option value="Completed">Completed</option>
        </select>
        <br/><br/>
        <button type="submit" className="addingTask">{currentTodo ? 'Update Task' : 'Add Task'}</button>&nbsp;&nbsp;
        <button type="button" onClick={handleClose} className="cancelTask">Cancel</button>
      </form>
    </div>
  );
};

export default AddTodo;
