import React, { useState, useEffect } from 'react'
import allDogData from '../dogApiNew'
import Filter from './Filter'
import Content from './Content'
import '../statics/App.css'

function App() {
	const [appliedSizeFilters, setAppliedSizeFilters] = useState([])
	const [appliedCharFilters, setAppliedCharFilters] = useState([])

	useEffect(() => {
		window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
	})

	const sortDogCards = (first, second) => {
		let breedA = first.breed.toLowerCase()
		let breedB = second.breed.toLowerCase()

		let comparison = 0
		if (breedA > breedB) {
			comparison = 1
		} else if (breedA < breedB) {
			comparison = -1
		}
		return comparison
	}

	const showData = () => dogsToShow()

	const dogsToShow = () => {
		if (appliedSizeFilters.length > 0 && appliedCharFilters.length > 0) {
			return allDogData
				.filter(
					dog =>
						appliedSizeFilters.includes(dog.size) &&
						appliedCharFilters.every(c => dog.temperament.includes(c))
				)
				.sort(sortDogCards)
		} else if (appliedSizeFilters.length > 0 && appliedCharFilters.length === 0) {
			return allDogData
				.filter(dog => appliedSizeFilters.includes(dog.size))
				.sort(sortDogCards)
		} else if (appliedSizeFilters.length === 0 && appliedCharFilters.length > 0) {
			return allDogData
				.filter(dog => appliedCharFilters.every(c => dog.temperament.includes(c)))
				.sort(sortDogCards)
		} else {
			return allDogData.sort(sortDogCards)
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
		} else {
			return <div className='ui segment filter-placeholder'></div>
		}
	}

	return (
		<div>
			<div className='container'>
				<div id='top-bar'>Find Yo Doggo</div>
				<div id='content' className='ui stackable two column grid'>
					<div className='four wide column'>
						<Filter onChange={handleFilterToggle} />
					</div>
					<div className='twelve wide column'>
						{displayAppliedFilters()}
						<Content data={showData()} />
					</div>
				</div>
			</div>
			<div
				id='scroll-to-top'
				onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })}
			>
				<i className='angle double up icon'></i>
			</div>
		</div>
	)
}

export default App
