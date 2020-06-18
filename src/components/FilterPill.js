import React from 'react'

const FilterPill = ({ content, handleFilterRemoval }) => {
	return (
		<a className='ui label' onClick={() => handleFilterRemoval(content)}>
			{content}
			<i className='delete icon'></i>
		</a>
	)
}

export default FilterPill
