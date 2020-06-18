import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Content from './Content'
import allDogData from '../allDogData'

const testData = [
	{
		id: 1,
		breed: 'Affenpinscher',
		weight: '6 - 13',
		height: '9 - 11.5',
		life: '10 - 12 years',
		characteristics: 'Stubborn, Curious, Playful, Adventurous, Active, Fun-loving',
		size: 'Small',
		image: 'https://cdn2.thedogapi.com/images/BJa4kxc4X_390x256.jpg',
	},
	{
		id: 2,
		breed: 'Afghan Hound',
		weight: '50 - 60',
		height: '25 - 27',
		life: '10 - 13 years',
		characteristics: 'Aloof, Clownish, Dignified, Independent, Happy',
		size: 'Large',
		image:
			'https://s3.amazonaws.com/cdn-origin-etr.akc.org/wp-content/uploads/2017/11/31151939/Afghan-Hound-running-in-the-winter.jpg',
	},
	{
		id: 3,
		breed: 'African Hunting Dog',
		weight: '44 - 66',
		height: '30',
		life: '11 years',
		characteristics: 'Wild, Hardworking, Dutiful',
		size: 'Large',
		image: 'https://cdn2.thedogapi.com/images/Z8LiOtceX.jpg',
	},
]

test('renders images on cards', () => {
	const component = render(<Content data={testData} />)

	expect(component.container.querySelector('div.ui.image > img')).toHaveAttribute(
		'src',
		'https://cdn2.thedogapi.com/images/BJa4kxc4X_390x256.jpg'
	)
	expect(
		component.container.querySelector('div.card ~ div.card > div.ui.image > img')
	).toHaveAttribute(
		'src',
		'https://s3.amazonaws.com/cdn-origin-etr.akc.org/wp-content/uploads/2017/11/31151939/Afghan-Hound-running-in-the-winter.jpg'
	)
	expect(
		component.container.querySelector('div.card ~ div.card ~ div.card > div.ui.image > img')
	).toHaveAttribute('src', 'https://cdn2.thedogapi.com/images/Z8LiOtceX.jpg')
})

test('renders card data', () => {
	const component = render(<Content data={testData} />)

	expect(
		component.container.querySelector('div.card > div.content > div.header')
	).toHaveTextContent('Affenpinscher')

	expect(
		component.container.querySelector('div.card > div.content > div.meta > span.right.floated')
	).toHaveTextContent('6 - 13 lbs')

	expect(
		component.container.querySelector(
			'div.card ~ div.card > div.content > div.meta > span:nth-child(2)'
		)
	).toHaveTextContent('25 - 27 in')

	expect(
		component.container.querySelector(
			'div.card ~ div.card ~ div.card > div.content > div.center.aligned.description'
		)
	).toHaveTextContent('Wild, Hardworking, Dutiful')
})

test('renders card link', () => {
	const component = render(<Content data={testData} />)

	expect(
		component.container.querySelector('div.card > div.content > div.header')
	).toHaveTextContent('Affenpinscher')

	expect(
		component.container.querySelector('div.card > div.ui.bottom.attached.blue.button > a')
	).toHaveTextContent('Adopt an Affenpinscher!')
})

test('render a when not a vowel', () => {
	const notVowelTestData = [
		{
			id: 32,
			breed: 'Bearded Collie',
			weight: '45 - 55',
			height: '20 - 22',
			life: '12 - 14 years',
			characteristics: 'Self-confidence, Hardy, Lively, Alert, Intelligent, Active',
			size: 'Large',
			image:
				'https://s3.amazonaws.com/cdn-origin-etr.akc.org/wp-content/uploads/2017/11/13000856/Bearded-Collie-On-White-01.jpg',
		},
	]
	const component = render(<Content data={notVowelTestData} />)

	expect(
		component.container.querySelector('div.card > div.content > div.header')
	).toHaveTextContent('Bearded Collie')

	expect(
		component.container.querySelector('div.card > div.ui.bottom.attached.blue.button > a')
	).toHaveTextContent('Adopt a Bearded Collie!')
})
