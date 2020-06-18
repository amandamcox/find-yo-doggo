import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import FilterGroup from './FilterGroup'

test('renders filters', () => {
	const items = ['Filter 1', 'Filter 2', 'Filter 3']
	const component = render(<FilterGroup title='Filter Group Title' items={items} />)

	expect(
		component.container.querySelector('div.field > .ui.toggle.checkbox > label')
	).toHaveTextContent('Filter 1')
	expect(
		component.container.querySelector('div.field:nth-child(2) > .ui.toggle.checkbox > label')
	).toHaveTextContent('Filter 2')
	expect(
		component.container.querySelector('div.field:nth-child(3) > .ui.toggle.checkbox > label')
	).toHaveTextContent('Filter 3')
})
