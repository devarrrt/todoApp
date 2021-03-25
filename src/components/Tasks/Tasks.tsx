import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import './Tasks.scss'
import pencilSvg from '../../img/Pencil.svg'
import { AddFormTasks } from '..'
import Task from './Task'




interface ITasks {
	list: any
	onEditTitle: ( id: number, title: string ) => void
	onAddTask: ( ) => void
	withTitle?: boolean
	onRemoveTask: ( id: number, list: number ) => void
	onEditTask: ( id: number, obj: any ) => void
	onCompleteTask: ( ) => void
}



const Tasks: React.FC<ITasks> = ({ list, onEditTitle, onAddTask, withTitle, onRemoveTask, onEditTask, onCompleteTask }) => {



	const editTitle = ( ) => {
		const newTitle = window.prompt( 'Новое название', list.name )
		if ( newTitle ) {
			onEditTitle( list.id, newTitle )
			axios.patch('http://localhost:3001/lists/' + list.id, {
				name: newTitle
			})
			.catch( ( )=> alert( 'Не удалось обновить название. Попробуйте еще разок' )  )
		}
	}



	return (
		<div className="tasks">
 			<Link to={`/lists/${list.id}`}>
			 <h2 
			className="tasks__title"
			style={{ color: list.color.hex }}
			 >
				<span> {list.name} </span>
				<img 
				onClick={ editTitle }
				src={pencilSvg} alt="pencilSvg" />
			</h2>
			</Link>


			<div className="tasks__items">
				{ !withTitle && list.tasks && !list.tasks.length && (
					<h3> Задачи пока отсутствуют </h3>
				)}

				{/* @ts-ignore */}
				{ list.tasks && list.tasks.map( task => (
						<Task 
						{ ...task } 
						key={ task.id } 
						list={ list }
						onRemoveTask={ onRemoveTask }
						onEditTask={ onEditTask }
						onCompleteTask={ onCompleteTask }
						/>
				))}

				<AddFormTasks
				key={ list.id } //чтобы каждый раз не было открыто поле ввода, нужно добавить ключ. тогда компонент рендеритя каждый каждый раз заново
				list={ list }
				onAddTask={ onAddTask } 
				/>
			</div>
		</div>
	)
}

export default Tasks
