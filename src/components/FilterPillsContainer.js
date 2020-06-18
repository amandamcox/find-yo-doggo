import React from 'react'
import FilterPill from './FilterPill'

const FilterPillsContainer = ({ filters, handleFilterRemoval }) => (
	<div className='ui segment'>
		{filters.length > 0 ? (
			filters.map(filter => (
				<FilterPill
					content={filter.filterOption}
					key={filter.filterOption}
					handleFilterRemoval={handleFilterRemoval}
				/>
			))
		) : (
			<div className='ui segment filter-placeholder'></div>
		)}
	</div>
)

export default FilterPillsContainer
