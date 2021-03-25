import React, { useState } from 'react'
import axios from 'axios'
import classnames from 'classnames'
import './LIst.scss'
import Badge from '../Badge/Badge'

import closeBtn from '../../img/close.png'

// export interface IItem {
// 	id?: number | undefined,
// 	icon?: string | null,
// 	name: any,
// 	color?: string | null, 
// 	active?: boolean,
// 	className?: string 
// }

// interface IList {
// 	items: IItem[],
// 	isRemovable?: boolean,
// 	togglePopup?: () => void,
// 	removeList?: ( id: number ) => void
// }


const List = ({ items, isRemovable, togglePopup, onRemove, onClickItem, activeItem }) => {


	const remove = (item) => {
		if (window.confirm('Вы действительно хотите удалить список?')) {
      axios.delete('http://localhost:3001/lists/' + item.id).then(() => {
        onRemove(item.id);
      });
    }
	}


	return (
		<ul
			onClick={togglePopup}
			className="list">
			{ items.map((item, index) => (
				<li
					key={index}
					onClick={ onClickItem ? ()=> onClickItem( item ) : null  }
					className={classnames(item.className, {
				active: activeItem && activeItem.id === item.id
					})} >
					<i> {item.icon ? item.icon : <Badge color={item.color.name} />}
					</i>
					<span> {item.name} {item.tasks && ` (${item.tasks.length})`} </span>

					{ isRemovable && 
					<img
						onClick={() => remove(item)}
						className="list__remove-btn"
						 src={closeBtn} alt="closeBtn" 
						/>}
				</li>
			)
			)}
		</ul>
	)
}

export default List
