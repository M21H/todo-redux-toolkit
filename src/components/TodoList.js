import React, { memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteTodo, toggleStatus } from '../store/totoSlice'
import TodoItem from './TodoItem'

const TodoList = () => {
	const { todos } = useSelector(({ todos }) => todos)
	const dispatch = useDispatch()

	const onDelete = (id) => {
		dispatch(deleteTodo(id))
	}

	const onToggle = (id) => {
		dispatch(toggleStatus(id))
	}

	return (
		<>
			<ul>
				{todos.map((todo) => (
					<TodoItem key={todo.id} {...todo} onRemove={() => onDelete(todo.id)} onToggle={() => onToggle(todo.id)} />
				))}
			</ul>
		</>
	)
}

export default memo(TodoList)
