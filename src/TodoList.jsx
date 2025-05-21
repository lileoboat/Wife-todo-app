import React, { useState, useEffect } from 'react'

function TodoList() {
    const [todos, setTodos] = useState(() => {
        const savedTodos = localStorage.getItem("todoTasks");
        return savedTodos ? JSON.parse(savedTodos) : ["Call your Husband", "Pray together", "Go to work"];
    });

    const [newTodo, setNewTodo] = useState("");

    useEffect(() => {
        localStorage.setItem("todoTasks", JSON.stringify(todos));
    }, [todos]);


    function handleTodoInput(event){
        setNewTodo(event.target.value);

    }

    function addTodo(){
        if(newTodo.trim() !== ""){
            setTodos([...todos, newTodo]);
            setNewTodo("");
        }
    }

    function removeTodo(index){
        const updateTasks = todos.filter((_, i) => i !== index);
        setTodos(updateTasks);

    }

    function moveTodoUp(index){
        if(index > 0){
            const updatedTasks = [...todos];
            [updatedTasks[index], updatedTasks[index - 1]] =
            [updatedTasks[index - 1], updatedTasks[index]];
            setTodos(updatedTasks);
        }

    }

    function moveTodoDown(index){
        if(index < todos.length - 1){
            const updatedTasks = [...todos];
            [updatedTasks[index], updatedTasks[index + 1]] =
            [updatedTasks[index + 1], updatedTasks[index]];
            setTodos(updatedTasks);
        }

    }




  return (
    <div className='todo-list'>
        <h1>Babes To-do List</h1>
        <h2>Daily Suggestions</h2>
        <ul className='suggestions'>
            <li className='suggestion'>Call your Husband(Joseph❤️)</li>
            <li className='suggestion'>Pray together</li>
            <li className='suggestion'>Go to work</li>
        </ul>
        <div>
            <input type="text" value={newTodo} onChange={handleTodoInput} placeholder='Add a to-do' />
            <button className='add-button' onClick={addTodo}>Add</button>
        </div>
        <ul>
            {todos.map((todo, index) => 
            <li key={index}>
                <span className='todo-text'>{todo}</span>
                <button className='delete-button' onClick={() => removeTodo(index)}>Delete</button>
                <button className='move-button' onClick={() => moveTodoUp(index)}>👆</button>
                <button className='move-button' onClick={() => moveTodoDown(index)}>👇</button>
            </li>)}
        </ul>
    </div>
  )
}

export default TodoList