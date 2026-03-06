import React from 'react'
import Todocard from './todocard'

export default function Todolist(props) {
  const { 
    todos, 
    completedTodos, 
    handleDeleteTodo, 
    handleDeleteCompletedTodo, 
    editTodo,
    handleCompleteTodo 
  } = props

  return (
    <>
      <h2 className="section-title">
        <i className="fa-solid fa-clipboard-list"></i> 
        ACTIVE TASKS ({todos.length})
      </h2>
      <ul className='main'>
        {todos.map((todo, todoIndex) => (
          <Todocard 
            key={todoIndex}
            index={todoIndex}
            todo={todo}
            onDelete={handleDeleteTodo}
            onEdit={editTodo}
            onComplete={handleCompleteTodo}
            isCompleted={false}
            data-index={todoIndex}
          >
            <p>{todo}</p>
          </Todocard>
        ))}
        {todos.length === 0 && (
          <div className="empty-message">
            ✨ No active tasks. Add some! ✨
          </div>
        )}
      </ul>

      {completedTodos.length > 0 && <div className="divider"></div>}

      {completedTodos.length > 0 && (
        <>
          <h2 className="section-title">
            <i className="fa-solid fa-circle-check"></i> 
            COMPLETED ({completedTodos.length})
          </h2>
          <div className="completed-section">
            <ul className='completed-grid'>
              {completedTodos.map((todo, todoIndex) => (
                <Todocard
                  key={`completed-${todoIndex}`}
                  index={todoIndex}
                  todo={todo}
                  onDelete={handleDeleteCompletedTodo}
                  isCompleted={true}
                >
                  <p>{todo}</p>
                </Todocard>
              ))}
            </ul>
          </div>
        </>
      )}
    </>
  )
}