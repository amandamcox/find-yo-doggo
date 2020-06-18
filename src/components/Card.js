import React from 'react'

const Card = ({ dogObject }) => {
	const determineArticle = name => {
		let firstLetter = name.charAt(0)
		if (['A', 'E', 'I', 'O', 'U'].includes(firstLetter)) {
			return 'an'
		} else {
			return 'a'
		}
	}

	return (
		<div className='card' key={dogObject.id}>
			<div className='ui image'>
				<img src={dogObject.image} alt={dogObject.breed} />
			</div>
			<div className='content'>
				<div className='header'>{dogObject.breed}</div>
				<div className='meta'>
					<span className='right floated'>{dogObject.weight}</span>
					<span>{dogObject.height}</span>
				</div>
				<div className='center aligned description'>
					{dogObject.temperament}
				</div>
			</div>
			<div className='ui bottom attached blue button'>
				<a
					href={`https://www.petfinder.com/search/dogs-for-adoption/?breed%5B0%5D=${encodeURIComponent(
						dogObject.breed
					)}&sort%5B0%5D=recently_added`}
					target='_blank'
					rel='noopener noreferrer'
				>
					<i className='heart outline icon'></i>
					Adopt {determineArticle(dogObject.breed)} {dogObject.breed}!
				</a>
			</div>
		</div>
	)
}

export default Card
