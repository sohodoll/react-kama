/* eslint-disable testing-library/await-async-query */
import React from 'react'
import { create } from 'react-test-renderer'
import { ProfileStatus } from './ProfileStatus'

describe('status renders', () => {
  test('status from props should be in the state', () => {
    const component = create(<ProfileStatus status='it-kamasutra.com' />)
    const instance = component.getInstance()
    expect(instance.state.status).toBe('it-kamasutra.com')
  })

  test('input instead of span', () => {
    const component = create(<ProfileStatus status='it-kamasutra.com' />)
    const root = component.root
    const span = root.findByType('span')
    expect(span).not.toBeNull()
  })

  test('after creation span should correct correct status', () => {
    const component = create(<ProfileStatus status='it-kamasutra.com' />)
    const root = component.root
    const span = root.findByType('span')
    expect(span.children[0]).toBe('it-kamasutra.com')
  })

  test('input should be displayed in edit mode', () => {
    const component = create(<ProfileStatus status='it-kamasutra.com' />)
    const root = component.root
    let span = root.findByType('span')

    span.props.onClick()

    const input = root.findByType('input')

    expect(input).toBeDefined()
    expect(() => {
      span = root.findByType('span')
    }).toThrow()
  })

  test('callback should be called', () => {
    const mockCallback = jest.fn()
    const component = create(<ProfileStatus status='it-kamasutra.com' updateStatus={mockCallback} />)
    const instance = component.getInstance()

    expect(mockCallback.mock.calls.length).toBe(0)
  })
})
