import './App.css';
import { useState, useEffect } from 'react';
import { PencilFill, Trash3Fill } from 'react-bootstrap-icons';
import { useDispatch, useSelector } from 'react-redux';
import { removeTodo, toggleTodo } from './todoSlice';
import Swal from 'sweetalert2';
import AddTodo from './AddTodo';
import Modal from 'react-bootstrap/Modal';

function App() {
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [currentTodo, setCurrentTodo] = useState(null);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const storedFilter = localStorage.getItem('filter');
    if (storedFilter) {
      setFilter(storedFilter);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('filter', filter);
  }, [filter]);

  const handleToggle = (id) => {
    dispatch(toggleTodo(id));
  };

  const deleteTodo = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(removeTodo(id));
        Swal.fire('Deleted!', 'Your todo has been deleted.', 'success');
      }
    });
  };

  const handleShow = () => setShowModal(true);
  const handleClose = () => {
    setShowModal(false);
    setCurrentTodo(null);
  };

  const handleEdit = (todo) => {
    setCurrentTodo(todo);
    handleShow();
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === "All") return true;
    if (filter === "Completed") return todo.completed;
    if (filter === "Incompleted") return !todo.completed;
    return true;
  });

  return (
    <div className="App">
      <br/>
      <p style={{ textAlign: "center" }} className='heading'>TODO LIST</p>
      <div className='main'>
        <div className='filter'>
          <div className='button'>
            <button className='addingTask' onClick={handleShow}>Add Task</button>
          </div>
  
          <div className='dropdown'>
            <select name='options' id='options' value={filter} onChange={(e) => setFilter(e.target.value)} className='optionSelect'>
              <option value="All">All</option>
              <option value="Incompleted">Incompleted</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        </div>
        <br />
  
        <div className='cardbody'>
          {
          filteredTodos.length === 0 ? (
            <div className="noTodos">No Todos</div>) 
            :
            (
              filteredTodos.map((todo) => (
              <div className='innerCard' key={todo.id}>

                <div className='left'>
                  <div className='square'>
                    <input type="checkbox" checked={todo.completed} onChange={() => handleToggle(todo.id)} className='checkbox'style={{backgroundColor:"#646ff0"}}/>
                  </div>
                  <div className='taskName'>
                    <span className={`fontsize ${todo.completed ? 'completed' : ''}`}>
                      {todo.completed ? <del>{todo.text}</del> : todo.text}
                    </span>
                    <span className='time'>{todo.time}</span>
                  </div>
                </div>
                
                <div className='right'>
                  <div className='icons'>
                    <span onClick={() => deleteTodo(todo.id)}>
                      <Trash3Fill size={16} />
                    </span>
                    <span onClick={() => handleEdit(todo)}>
                      <PencilFill size={16} />
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
  
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{currentTodo ? 'UPDATE TODO' : 'ADD TODO'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddTodo handleClose={handleClose} currentTodo={currentTodo} />
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default App;
