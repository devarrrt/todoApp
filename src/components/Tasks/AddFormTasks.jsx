import React, { useState } from 'react'
import axios from 'axios'
import addSvg from '../../img/add.svg'


const AddFormTasks = ({ onAddTask, list }) => {
	const [visibleForm, setVisibleForm] = useState(false)
	const [inputValue, setInputValue] = useState("")
	const [isLoading, setLoading] = useState(false)

	const toggleVisibleForm = () => {
		setVisibleForm(!visibleForm)
		setInputValue('')
	}

	const addTask = () => {
		const newTask = {
			listId: list.id,
			text: inputValue,
			completed: false
		}
		setLoading( true )
		axios.post( 'http://localhost:3001/tasks', newTask )
		.then(({data}) => {
			onAddTask( list.id, data )
			toggleVisibleForm( false )
		})
		.catch(()=> alert( 'Ошибочка тут у вас' ))
		.finally(()=> setLoading( false ))
	}



	return (
		<div className="tasks__form">
			{ !visibleForm ?
				<div
					onClick={toggleVisibleForm}
					className="tasks__form-new">
					<img src={addSvg} alt="new task" />
					<span> Добавить задачу </span>
				</div>
				:
				<div className="tasks__form-block">
					<button
						className="add__list-popup-close form"
						onClick={() => setVisibleForm(false)}
					> close </button>
					<input
						value={inputValue}
						onChange={e => setInputValue(e.target.value)}
						className="field field--form "
						type="text"
						placeholder="Текст задачи"
					/>
					<button
						onClick={addTask}
						className="button button--grey"> {isLoading ? 'Добавление...' : 'Добавить'} </button>
				</div>
			}
		</div>
	)
}



export default AddFormTasks
