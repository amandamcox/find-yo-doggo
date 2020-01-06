import React from 'react'

const Content = ({ data }) => {
	const whenToAn = breedName => {
		let firstLetter = breedName.charAt(0)
		if (['A', 'E', 'I', 'O', 'U'].includes(firstLetter)) {
			return 'an'
		} else {
			return 'a'
		}
	}

	const displayNoResults = () => (
		<div id='no-results' className='ui info message'>
			<div className='header'>No Results Found</div>
			Try removing some filters for more results.
		</div>
	)

	return (
		<div>
			{data.length === 0 ? (
				displayNoResults()
			) : (
				<div className='ui two cards'>
					{data.map(eachDog => (
						<div className='card' key={eachDog.id}>
							<div className='ui image'>
								<img src={eachDog.image} alt={eachDog.breed} />
							</div>
							<div className='content'>
								<div className='header'>{eachDog.breed}</div>
								<div className='meta'>
									<span className='right floated'>{eachDog.weight} lbs</span>
									<span>{eachDog.height} in</span>
								</div>
								<div className='center aligned description'>
									{eachDog.characteristics}
								</div>
							</div>
							<div className='ui bottom attached blue button'>
								<a
									href={`https://www.petfinder.com/search/dogs-for-adoption/?breed%5B0%5D=${encodeURIComponent(
										eachDog.breed
									)}&sort%5B0%5D=recently_added`}
									target='_blank'
									rel='noopener noreferrer'
								>
									<i className='heart outline icon'></i>
									Adopt {whenToAn(eachDog.breed)} {eachDog.breed}!
								</a>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	)
}

export default Content
