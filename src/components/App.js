import React, { useState, useEffect } from 'react'
import allDogData from '../allDogData'
import Filter from './Filter'
import Content from './Content'
import '../statics/App.css'

function App() {
	const [appliedSizeFilters, setAppliedSizeFilters] = useState([])
	const [appliedCharFilters, setAppliedCharFilters] = useState([])

	useEffect(() => {
		window.scrollTo(0, 0)
	})

	const showData = () => dogsToShow()

	const dogsToShow = () => {
		if (appliedSizeFilters.length > 0 && appliedCharFilters.length > 0) {
			return allDogData.filter(
				dog =>
					appliedSizeFilters.includes(dog.size) &&
					appliedCharFilters.every(c => dog.characteristics.includes(c))
			)
		} else if (appliedSizeFilters.length > 0 && appliedCharFilters.length === 0) {
			return allDogData.filter(dog => appliedSizeFilters.includes(dog.size))
		} else if (appliedSizeFilters.length === 0 && appliedCharFilters.length > 0) {
			return allDogData.filter(dog =>
				appliedCharFilters.every(c => dog.characteristics.includes(c))
			)
		} else {
			return allDogData
		}
	}

	const handleFilterToggle = (toggle, filter) => {
		if (toggle) {
			return ['Toy', 'Small', 'Medium', 'Large', 'Extra Large'].includes(filter)
				? setAppliedSizeFilters(appliedSizeFilters.concat(filter))
				: setAppliedCharFilters(appliedCharFilters.concat(filter))
		} else {
			return ['Toy', 'Small', 'Medium', 'Large', 'Extra Large'].includes(filter)
				? setAppliedSizeFilters(appliedSizeFilters.filter(f => f !== filter))
				: setAppliedCharFilters(appliedCharFilters.filter(f => f !== filter))
		}
	}

	const displayAppliedFilters = () => {
		const filters = [...appliedSizeFilters, ...appliedCharFilters]
		if (filters.length > 0) {
			return (
				<div className='ui segment'>
					{filters.map(filter => (
						<a
							className='ui label'
							key={`applied-${filter}`}
							onClick={() => {
								document.getElementById(`filter${filter}`).checked = false
								handleFilterToggle(false, filter)
							}}
						>
							{filter}
							<i className='delete icon'></i>
						</a>
					))}
				</div>
			)
		}
	}

	return (
		<div className='container'>
			<div id='top-bar'>Find Yo Doggo</div>
			<div id='content' className='ui two column grid'>
				<div className='four wide column'>
					<Filter onChange={handleFilterToggle} />
				</div>
				<div className='twelve wide column'>
					{displayAppliedFilters()}
					<Content data={showData()} />
				</div>
			</div>
		</div>
	)
}

export default App
