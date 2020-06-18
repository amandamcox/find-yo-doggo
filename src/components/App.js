import React, { useState, useEffect } from 'react'
import allDogData from '../dogData.json'
import FilterContainer from './FilterContainer'
import FilterPillsContainer from './FilterPillsContainer'
import CardGrid from './CardGrid'
import '../statics/App.css'

const App = () => {
	const [results, setResults] = useState([])
	const [filters, setFilters] = useState([])

	useEffect(() => {
		if (filters.length > 0) {
			const onlyFilters = filters.map(filter => filter.filterOption)
			const onlySizeFilters = onlyFilters.filter(filter =>
				['Toy', 'Small', 'Medium', 'Large', 'Extra Large'].includes(
					filter
				)
			)
			const onlyCharFilters = onlyFilters.filter(
				filter =>
					![
						'Toy',
						'Small',
						'Medium',
						'Large',
						'Extra Large'
					].includes(filter)
			)

			if (onlySizeFilters.length > 0 && onlyCharFilters.length > 0) {
				const matchingResults = allDogData.filter(
					dog =>
						onlySizeFilters.includes(dog.size) &&
						onlyCharFilters.every(char =>
							dog.temperament.includes(char)
						)
				)
				setResults(matchingResults)
			} else if (
				onlySizeFilters.length > 0 &&
				onlyCharFilters.length === 0
			) {
				const matchingResults = allDogData.filter(dog =>
					onlySizeFilters.includes(dog.size)
				)
				setResults(matchingResults)
			} else if (
				onlySizeFilters.length === 0 &&
				onlyCharFilters.length > 0
			) {
				const matchingResults = allDogData.filter(dog =>
					onlyCharFilters.every(char =>
						dog.temperament.includes(char)
					)
				)
				setResults(matchingResults)
			}
		} else {
			const sortedResults = allDogData.sort((a, b) =>
				a.breed.localeCompare(b.breed)
			)
			setResults(sortedResults)
		}
	}, [filters])

	const handleFilterToggle = (filterOption, filterType) => {
		const isAlreadyChecked = filters.find(
			filterObj => filterObj.filterOption === filterOption
		)
		if (isAlreadyChecked) {
			const removedFilter = filters.filter(
				filterObj => filterObj.filterOption !== filterOption
			)
			setFilters(removedFilter)
		} else {
			setFilters(prevFilters => [
				...prevFilters,
				{ filterOption, filterType }
			])
		}
	}

	const handleFilterRemoval = filterToRemove => {
		const withFilterRemoved = filters.filter(
			filter => filter.filterOption !== filterToRemove
		)
		setFilters(withFilterRemoved)
	}

	return (
		<div>
			<div className='container'>
				<div id='top-bar'>Find Yo Doggo</div>
				<div id='content' className='ui stackable two column grid'>
					<div className='four wide column'>
						<FilterContainer
							onToggle={handleFilterToggle}
							appliedFilters={filters.map(
								filter => filter.filterOption
							)}
						/>
					</div>
					<div className='twelve wide column'>
						<FilterPillsContainer
							filters={filters}
							handleFilterRemoval={handleFilterRemoval}
						/>
						<CardGrid results={results} />
					</div>
				</div>
			</div>
			<div
				id='scroll-to-top'
				onClick={() =>
					window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
				}
			>
				<i className='angle double up icon'></i>
			</div>
		</div>
	)
}

export default App
