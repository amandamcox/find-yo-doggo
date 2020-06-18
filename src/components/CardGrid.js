import React from 'react'
import Card from './Card'

const CardGrid = ({ results }) => (
	<div>
		{results.length === 0 ? (
			<div id='no-results' className='ui info message'>
				<div className='header'>No Results Found</div>
				Try removing filters for more results.
			</div>
		) : (
			<div className='ui stackable two cards'>
				{results.map(result => (
					<Card key={result.breed} dogObject={result} />
				))}
			</div>
		)}
	</div>
)

export default CardGrid
