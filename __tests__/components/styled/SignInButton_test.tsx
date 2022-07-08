import React from 'react';
import { create, act } from 'react-test-renderer';

import SignInButton from '../../../src/components/styled/SignInButton'
import SignInModal from '../../../src/components/styled/SignInModal';
import Button from '../../../src/components/headless/Button'


describe("SignInButton", () => {
  it('renders correctly', () => {
    const rendered = create(
      <SignInButton />
    ).toJSON();
    expect(rendered).toMatchSnapshot()
  });

  it('triggers the SignInModal when clicked and triggers onClick callback', () => {
    const onClick = jest.fn();
    const signInButton = create(
      <SignInButton 
        onClick={onClick}
      />
    )
    const testInstance = signInButton.root;
    expect(testInstance.findAllByProps({ isOpen: true }).length).toBe(0)
    expect(onClick.mock.calls.length).toBe(0)

    act(() => {
      testInstance.findByType(Button).props.onClick();
    })

    expect(testInstance.findAllByProps({ isOpen: true }).length).toBe(1)
    expect(onClick.mock.calls.length).toBe(1)
  });

  it('passes along onEmailSent to the signInModal', () => {
    const onEmailSent = jest.fn();
    const signInButton = create(
      <SignInButton 
        onEmailSent={onEmailSent}
      />
    )
    const testInstance = signInButton.root;
    const modal = testInstance.findByType(SignInModal)
    expect(modal.props.onEmailSent).toBe(onEmailSent)
  })
});