import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import InputField from './components/InputField'
import TodoList from './components/TodoList'
import { addNewTodo, fetchTodos } from './store/totoSlice'

function App() {
	const [text, setText] = useState('')
	const dispatch = useDispatch()
	const { status, error } = useSelector(({ todos }) => todos)

	const onNewTodo = () => {
		if (text.trim().length) {
			dispatch(addNewTodo(text))
			setText('')
		}
	}

	useEffect(() => {
		dispatch(fetchTodos(5))
	}, [])

	return (
		<div>
			<InputField type='text' placeholder='todo' addNewTodo={onNewTodo} setText={setText} text={text} />
			{status === 'pending' && <h1>Loading...</h1>}
			{error && <h2>{error}</h2>}

			<TodoList />
		</div>
	)
}

export default App
