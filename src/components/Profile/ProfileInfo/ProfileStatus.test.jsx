/* eslint-disable testing-library/await-async-query */
import React from 'react';
import { create } from 'react-test-renderer';
import { ProfileStatus } from './ProfileStatus';

describe('status renders', () => {
  test('status from props should be in the state', () => {
    const component = create(<ProfileStatus status='it-kamasutra.com' />);
    const instance = component.getInstance();
    expect(instance.state.status).toBe('it-kamasutra.com');
  });

  test('input instead of span', () => {
    const component = create(<ProfileStatus status='it-kamasutra.com' />);
    const root = component.root;
    const span = root.findByType('span');
    expect(span).not.toBeNull();
  });

  test('after creation span should correct correct status', () => {
    const component = create(<ProfileStatus status='it-kamasutra.com' />);
    const root = component.root;
    const span = root.findByType('span');
    expect(span.children[0]).toBe('it-kamasutra.com ');
  });
});
