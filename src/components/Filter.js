import React from 'react'
import FilterGroup from './FilterGroup'
import characteristicsData from '../allCharacteristics'

const Filter = ({ onChange }) => {
	const sizeArr = ['Toy', 'Small', 'Medium', 'Large', 'Extra Large']
	const charArr = characteristicsData

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
							<FilterGroup title='sizes' items={sizeArr} onChange={onChange} />
						</form>
					</div>
					<div className='ui divider'></div>
					<div className='title'>
						<i aria-hidden='true' className='dropdown icon'></i>
						Dog Characteristics
					</div>
					<div className='content'>
						<form className='ui form'>
							<FilterGroup
								title='characteristics'
								items={charArr}
								onChange={onChange}
							/>
						</form>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Filter
