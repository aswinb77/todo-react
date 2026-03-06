import React from 'react'

export default function Todocard(props) {
  const { 
    children, 
    index, 
    todo,
    onDelete,
    onEdit,
    onComplete,
    isCompleted
  } = props

  const handleComplete = () => {
    if (!isCompleted && onComplete) {
      onComplete(index)
    }
  }

  const handleEdit = () => {
    if (!isCompleted && onEdit) {
      const newText = prompt('Edit task:', todo)
      if (newText && newText.trim() !== '') {
        onEdit(index)
      }
    }
  }

  const handleDelete = () => {
    if (onDelete) {
      onDelete(index)
    }
  }

  return (
    <li className={`todoItem ${isCompleted ? 'completed' : ''}`} data-index={index}>
      <div className='card-header'>
        <div 
          className={`complete-circle ${isCompleted ? 'completed' : ''}`}
          onClick={handleComplete}
        >
          {isCompleted && <i className="fa-solid fa-check"></i>}
        </div>
      </div>
      {children}
      <div className='actionsContainer'>
        {!isCompleted && (
          <button onClick={handleEdit}>
            <i className="fa-solid fa-pen-to-square"></i>
          </button>
        )}
        <button onClick={handleDelete}>
          <i className="fa-solid fa-trash"></i>
        </button>
      </div>
    </li>
  )
}