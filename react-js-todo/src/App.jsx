import Todolist from "./components/todolist"
import Todo from "./components/todo"
import { useState, useEffect } from "react"

function App() {
  const [todos, setTodos] = useState([])
  const [completedTodos, setCompletedTodos] = useState([])
  const [todoValue, setTodoValue] = useState('')

  function persistData(newList, type = 'active'){
    if (type === 'active') {
      localStorage.setItem('todos', JSON.stringify({ todos: newList }))
    } else {
      localStorage.setItem('completedTodos', JSON.stringify({ completedTodos: newList }))
    }
  }

  // Load data from localStorage
  useEffect(() => {
    if (!localStorage) return

    let localTodos = localStorage.getItem('todos')
    if (localTodos) {
      localTodos = JSON.parse(localTodos).todos
      setTodos(localTodos || [])
    }

    let localCompleted = localStorage.getItem('completedTodos')
    if (localCompleted) {
      localCompleted = JSON.parse(localCompleted).completedTodos
      setCompletedTodos(localCompleted || [])
    }
  }, [])

  // Add new todo
  function handleAddTodos(newTodo) {
    if (!newTodo.trim()) return
    const newTodoList = [...todos, newTodo]
    persistData(newTodoList, 'active')
    setTodos(newTodoList)
  }

  // Delete active todo
  function handleDeleteTodo(index) {
    const newTodoList = todos.filter((_, todoIndex) => todoIndex !== index)
    persistData(newTodoList, 'active')
    setTodos(newTodoList)
  }

  // Delete completed todo
  function handleDeleteCompletedTodo(index) {
    const newCompletedList = completedTodos.filter((_, todoIndex) => todoIndex !== index)
    persistData(newCompletedList, 'completed')
    setCompletedTodos(newCompletedList)
  }

  // Edit todo
  function editTodo(index) {
    const valueToBeEdited = todos[index]
    setTodoValue(valueToBeEdited)
    handleDeleteTodo(index)
  }

  // Mark todo as complete and move to completed section
  function handleCompleteTodo(index) {
    const completedTodo = todos[index]
    
    // Add to completed list
    const newCompletedList = [...completedTodos, completedTodo]
    setCompletedTodos(newCompletedList)
    persistData(newCompletedList, 'completed')
    
    // Remove from active list with animation
    const todoElement = document.querySelector(`[data-index="${index}"]`)
    if (todoElement) {
      todoElement.classList.add('disappearing')
      setTimeout(() => {
        const newTodoList = todos.filter((_, i) => i !== index)
        setTodos(newTodoList)
        persistData(newTodoList, 'active')
      }, 380)
    }
  }

  return (
    <>
      <Todo 
        todoValue={todoValue} 
        setTodoValue={setTodoValue} 
        handleAddTodos={handleAddTodos} 
      />
      <Todolist 
        todos={todos}
        completedTodos={completedTodos}
        handleDeleteTodo={handleDeleteTodo}
        handleDeleteCompletedTodo={handleDeleteCompletedTodo}
        editTodo={editTodo}
        handleCompleteTodo={handleCompleteTodo}
      />
    </>
  )
}

export default App