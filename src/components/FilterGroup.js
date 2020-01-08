import React from 'react'

const FilterGroup = ({ title, items, onChange }) => {
	const handleOnClick = (toggle, filter) => {
		onChange(toggle, filter)

		if (document.body.clientWidth <= 600) {
			document.querySelector('.title.active').classList.remove('active')
			document.querySelector('.content.active').classList.remove('active')
		}
	}

	return (
		<div className='grouped fields'>
			{items.map((each, index) => (
				<div className='field' key={index}>
					<div className='ui toggle checkbox'>
						<input
							id={`filter${each}`}
							type='checkbox'
							className='hidden'
							name={title}
							value={each}
							onChange={() =>
								handleOnClick(
									document.getElementById(`filter${each}`).checked,
									each
								)
							}
						/>
						<label htmlFor={`filter${each}`} className='ui horizontal label'>
							{each}
						</label>
					</div>
				</div>
			))}
		</div>
	)
}

export default FilterGroup
