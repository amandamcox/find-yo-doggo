import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Filter from './Filter'

test('renders filter by title', () => {
	const component = render(<Filter />)

	expect(
		component.container.querySelector('h4.ui.horizontal.divider.blue.header')
	).toHaveTextContent('Filter By')
	expect(component.container.querySelector('i.filter.icon')).toBeInTheDocument()
})

test('renders filter section titles', () => {
	const component = render(<Filter />)

	expect(component.container.querySelector('div.active.title')).toHaveTextContent('Dog Sizes')
	expect(component.container.querySelector('div.item > div:nth-child(4)')).toHaveTextContent(
		'Dog Characteristics'
	)
})
