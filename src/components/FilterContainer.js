import React, { useState, useEffect } from 'react'
import Filter from './Filter'
import characteristicsData from '../allCharacteristics'

const FilterContainer = ({ onToggle, appliedFilters }) => {
	const [isFilterOpen, setIsFilterOpen] = useState(true)

	useEffect(() => {
		if (document.body.clientWidth <= 600) setIsFilterOpen(false)
	}, [])

	const sizeArr = ['Toy', 'Small', 'Medium', 'Large', 'Extra Large']
	const charArr = characteristicsData.sort()

	const handleToggleContainer = (filterOption, filterType) => {
		onToggle(filterOption, filterType)
	}

	return (
		<div>
			<h4 className='ui horizontal divider blue header'>
				<i className='filter icon'></i>
				Filter By
			</h4>
			<div className='ui accordion fluid vertical menu'>
				<div className='item'>
					<div className={`title ${isFilterOpen && 'active'}`}>
						<i aria-hidden='true' className='dropdown icon'></i>
						Dog Sizes
					</div>
					<div className={`content ${isFilterOpen && 'active'}`}>
						<form className='ui form'>
							<Filter
								filterType='size'
								filterOptions={sizeArr}
								handleToggle={handleToggleContainer}
								appliedFilters={appliedFilters}
							/>
						</form>
					</div>
					<div className='ui divider'></div>
					<div className={`title ${isFilterOpen && 'active'}`}>
						<i aria-hidden='true' className='dropdown icon'></i>
						Dog Characteristics
					</div>
					<div className={`content ${isFilterOpen && 'active'}`}>
						<form className='ui form'>
							<Filter
								filterType='characteristic'
								filterOptions={charArr}
								handleToggle={handleToggleContainer}
								appliedFilters={appliedFilters}
							/>
						</form>
					</div>
				</div>
			</div>
		</div>
	)
}

export default FilterContainer
