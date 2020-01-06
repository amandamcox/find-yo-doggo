import React from 'react'
import FilterGroup from './FilterGroup'
import filterDogData from '../dogDataByFilters'

const Filter = ({ onChange }) => {
	const filterData = filterDogData.dogDataByFilters
	const titles = Object.keys(filterData)
	const sizeArr = Object.keys(filterData.sizes)
	const charArr = Object.keys(filterData.characteristics)

	return (
		<div>
			<h4 className='ui horizontal divider blue header'>
				<i className='filter icon'></i>
				Filter By
			</h4>
			<div className='ui accordion fluid vertical menu'>
				<div className='item'>
					<div className='active title'>
						<i aria-hidden='true' className='dropdown icon'></i>
						Dog Sizes
					</div>
					<div className='content active'>
						<form className='ui form'>
							<FilterGroup title={titles[0]} items={sizeArr} onChange={onChange} />
						</form>
					</div>
					<div className='ui divider'></div>
					<div className='title'>
						<i aria-hidden='true' className='dropdown icon'></i>
						Dog Characteristics
					</div>
					<div className='content'>
						<form className='ui form'>
							<FilterGroup title={titles[1]} items={charArr} onChange={onChange} />
						</form>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Filter
