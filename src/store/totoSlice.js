import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async (limit, { rejectWithValue }) => {
	try {
		const res = await fetch(`https://jsonplaceholder.typicode.com/todos?_limit=${limit}`)
		if (!res.ok) {
			throw new Error('Server error!')
		}
		return await res.json()
	} catch (e) {
		return rejectWithValue(e.message)
	}
})

export const deleteTodo = createAsyncThunk('todos/deleteTodo', async (id, { dispatch, rejectWithValue }) => {
	try {
		const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, { method: 'DELETE' })
		if (!res.ok) {
			throw new Error('Cannot delete task. Server error')
		}
		dispatch(removeTodo(id))
	} catch (e) {
		return rejectWithValue(e.message)
	}
})

export const toggleStatus = createAsyncThunk('todos/toggleTodo', async (id, { dispatch, getState, rejectWithValue }) => {
	const todo = getState().todos.todos.find((todo) => todo.id === id)
	try {
		const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				completed: !todo.completed,
			}),
		})
		if (!res.ok) {
			throw new Error('Cannot change status. Server error')
		}
		dispatch(toggleTodo(id))
	} catch (e) {
		return rejectWithValue(e.message)
	}
})

export const addNewTodo = createAsyncThunk('todos/addNewTodo', async (text, { dispatch, rejectWithValue }) => {
	try {
		const todo = {
			title: text,
			userId: 1,
			completed: false,
		}
		const res = await fetch('https://jsonplaceholder.typicode.com/todos', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(todo),
		})
		if (!res.ok) {
			throw new Error('Cannot post new todo. Server error')
		}
		const data = await res.json()
		dispatch(addTodo(data))
	} catch (e) {
		return rejectWithValue(e.message)
	}
})

const setError = (state, action) => {
	state.status = 'rejected'
	state.error = action.payload
}

const totoSlice = createSlice({
	name: 'todo',
	initialState: {
		todos: [],
		status: null,
		error: null,
	},
	reducers: {
		addTodo(state, action) {
			state.todos.push(action.payload)
		},
		removeTodo(state, action) {
			state.todos = state.todos.filter((todo) => todo.id !== action.payload)
		},
		toggleTodo(state, action) {
			const todo = state.todos.find((todo) => todo.id === action.payload)
			todo.completed = !todo.completed
		},
	},
	extraReducers: {
		[fetchTodos.pending]: (state) => {
			state.status = 'pending'
			state.error = null
		},
		[fetchTodos.fulfilled]: (state, action) => {
			state.status = 'resolved'
			state.todos = action.payload
		},
		[fetchTodos.rejected]: setError,
		[deleteTodo.rejected]: setError,
		[toggleStatus.rejected]: setError,
		[addNewTodo.rejected]: setError,
	},
})

const { addTodo, removeTodo, toggleTodo } = totoSlice.actions
export default totoSlice.reducer
