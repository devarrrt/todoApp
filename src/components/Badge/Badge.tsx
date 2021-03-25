import React from 'react'
import classnames from 'classnames'
import './Badge.scss'


interface BadgeI {
	color: any,
	handleColor?: () => void,
	className?: any
}

const Badge: React.FC<BadgeI> = ({ color, handleColor, className }) => {
	return (
		<i
		onClick={handleColor}
    className={classnames('badge', { [`badge--${color}`]: color }, className)}>
			</i>
	)
}

export default Badge
