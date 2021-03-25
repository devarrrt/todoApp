import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Badge, List } from '../index';
import './AddList.scss'


// // export interface IColor {
// // 	id: number,
// // 	hex: string,
// // 	name: string
// // }

// // interface IAddList {
// // 	colors: IColor[],
// // 	addNewList: (obj: any) => void
// }


const AddList = ({ colors, addNewList }) => {

	const [visiblePopup, setVisiblePopup] = useState(false)
	const [selectColor, setSelectColor] = useState(3)
	const [inputValue, setInputValue] = useState('')
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		if (Array.isArray(colors)) {
			setSelectColor(colors[0].id)
		}
	}, [colors])

	const handleVisiblePopup = () => {
		setVisiblePopup(!visiblePopup)
	}
	const closePopup = () => {
		setVisiblePopup(false)
		setInputValue('')
		setSelectColor(colors[0].id)
	}


const  addList = ( ) => {
	if ( !inputValue ) {
	return alert( 'Поле не может быть пустым' )	
	} 
	setLoading( true )
	axios
	.post('http://localhost:3001/lists', {
		name: inputValue,
		colorId: selectColor
	})
	.then(({ data })=> {
		const color = colors.filter(c => c.id === selectColor)[0];
		const listObj = { ...data, color, tasks: [] };
		addNewList( listObj ) 
			closePopup()
	})
	.catch(() => {
		alert("Ошибочка тут у вас")
	})
	.finally(() => {
		setLoading( false )
	})
}




	return (
		<div className="add__list">
			<List
				items={[
					{ icon: '+', name: 'Добавить список', className: 'list__add-button' }
				]}
				togglePopup={handleVisiblePopup}
			/>

			{ visiblePopup ?
				<div className="add__list-popup">
					<button
						className="add__list-popup-close"
						onClick={closePopup}> close </button>

					<input
						value={inputValue}
						onChange={e => setInputValue(e.target.value)}
						className="field"
						placeholder="Название списка" />

					<div className="add__list-popup-color">
						{colors.map(color => (
							<Badge
								handleColor={() => setSelectColor(color.id)}
								key={color.id}
								color={color.name}
								className={selectColor === color.id && 'active'}
							/>
						))}
					</div>

					<button
						onClick={addList}
						className="button"
						> { loading ? "Добавление..." : "Добавить" } </button>
				</div> : ''}
		</div>
	)
}

export default AddList
