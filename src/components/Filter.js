import React from 'react'

const Filter = ({
	filterType,
	filterOptions,
	handleToggle,
	appliedFilters
}) => {
	return (
		<div className='grouped fields'>
			{filterOptions.map((filterOption, index) => (
				<div className='field' key={index}>
					<div className='ui toggle checkbox'>
						<input
							id={`filter${filterOption}`}
							type='checkbox'
							className='hidden'
							value={filterOption}
							checked={appliedFilters.includes(filterOption)}
							onChange={event =>
								handleToggle(event.target.value, filterType)
							}
						/>
						<label
							htmlFor={`filter${filterOption}`}
							className='ui horizontal label'
						>
							{filterOption}
						</label>
					</div>
				</div>
			))}
		</div>
	)
}

export default Filter
