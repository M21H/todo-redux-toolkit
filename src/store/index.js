import { configureStore } from '@reduxjs/toolkit'
import reducer from './totoSlice'

export default configureStore({
	reducer: {
		todos: reducer,
	},
	devTools: true,
})
