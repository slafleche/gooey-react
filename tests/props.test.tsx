import React from 'react'
import { render, screen } from '@testing-library/react'
import Goo from '../src'

it(`sets default intensity`, () => {
  render(<Goo><div /></Goo>)

  const blur = screen.getByTestId('blur')

  expect(blur.getAttribute('stdDeviation')).toBe('12')
})

it(`sets 'weak' intensity`, () => {
  render(<Goo intensity="weak"><div /></Goo>)

  const blur = screen.getByTestId('blur')

  expect(blur.getAttribute('stdDeviation')).toBe('8')
})

it(`sets 'strong' intensity`, () => {
  render(<Goo intensity="strong"><div /></Goo>)

  const blur = screen.getByTestId('blur')

  expect(blur.getAttribute('stdDeviation')).toBe('16')
})

it(`doesn't add composite by default`, () => {
  render(<Goo><div /></Goo>)

  expect(screen.queryByTestId('composite')).not.toBeInTheDocument()
})

it(`adds composite`, () => {
  render(<Goo composite><div /></Goo>)

  expect(screen.queryByTestId('composite')).toBeInTheDocument()
})

it(`applies id`, () => {
  const id = 'test'

  render(<Goo id={id}><div /></Goo>)

  const filter = screen.getByTestId('filter')

  expect(filter.getAttribute('id')).toBe(id)
})

it(`applies class`, () => {
  const className = 'mt-8'

  render(<Goo className={className}><div /></Goo>)

  expect(screen.getByTestId('element')).toHaveClass(className)
})

it(`applies style`, () => {
  const style = { marginTop : '2rem' }

  render(<Goo style={style}><div /></Goo>)

  expect(screen.getByTestId('element')).toHaveStyle(style)
})

it(`uses the same id for filter and element style`, () => {
  const id = 'custom-id'

  render(<Goo id={id}><div /></Goo>)

  const filter = screen.getByTestId('filter')
  const element = screen.getByTestId('element')

  expect(filter.getAttribute('id')).toBe(id)
  expect(element).toHaveStyle({ filter: `url(#${id})` })
})

it(`generates unique ids for multiple instances by default`, () => {
  render(
    <>
      <Goo><div data-testid="inside-1" /></Goo>
      <Goo><div data-testid="inside-2" /></Goo>
    </>
  )

  const filters = screen.getAllByTestId('filter')
  const elements = screen.getAllByTestId('element')

  const firstId = filters[0].getAttribute('id')
  const secondId = filters[1].getAttribute('id')

  expect(firstId).toBeTruthy()
  expect(secondId).toBeTruthy()
  expect(firstId).not.toBe(secondId)

  expect(elements[0]).toHaveStyle({ filter: `url(#${firstId})` })
  expect(elements[1]).toHaveStyle({ filter: `url(#${secondId})` })
})
