import React from 'react'

const TodoItem = ({ id, completed, title, onRemove, onToggle }) => {
	return (
		<div style={{ display: 'flex', alignItems: 'center' }}>
			<input type='checkbox' id={id} checked={completed} onChange={onToggle} />
			<label htmlFor={id} id={id} style={{ margin: '0 10px', textDecoration: completed && 'line-through', cursor: 'pointer' }}>
				{title}
			</label>
			<span style={{ color: 'red', cursor: 'pointer' }} onClick={onRemove}>
				X
			</span>
		</div>
	)
}

export default TodoItem
