import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import App from './App'

test('App component loads filter title div', () => {
	const component = render(<App />)
	expect(component.container.querySelector('#content > div.four.wide.column')).toContainHTML(
		'<h4 class="ui horizontal divider blue header"><i class="filter icon"></i>Filter By</h4>'
	)
})

test('App component loads applied filter placeholder empty', () => {
	const component = render(<App />)
	expect(
		component.container.querySelector(
			'#content > div.twelve.wide.column > div.ui.segment.filter-placeholder'
		)
	).toBeEmpty()
})

test('App component loads cards', () => {
	const component = render(<App />)
	expect(
		component.container.querySelector(
			'#content > div.twelve.wide.column > div:nth-child(2) > div > div.card'
		)
	).toBeInTheDocument()
})
