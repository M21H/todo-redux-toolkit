import React from 'react'

const InputField = ({ addNewTodo, setText, text, ...rest }) => {
	return (
		<>
			<input {...rest} autoFocus onChange={(e) => setText(e.target.value)} value={text} />
			<button type='button' onClick={addNewTodo}>add todo</button>
		</>
	)
}

export default InputField
