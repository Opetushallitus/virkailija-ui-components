import React from 'react';
import { screen } from '@testing-library/react';
import Checkbox from './index';
import { render, fireEvent } from '../testUtils';

test('Renders correctly with defaults', () => {
  const { rootElement } = render(
    <Checkbox onChange={() => {}}>Checkbox</Checkbox>,
  );
  expect(rootElement).toMatchSnapshot();
});

test('Clicking calls onChange-callback', () => {
  const changeHandler = jest.fn();
  const { rootElement } = render(
    <Checkbox onChange={changeHandler}>Checkbox</Checkbox>,
  );
  fireEvent.click(rootElement);
  expect(changeHandler).toBeCalledTimes(1);
  expect(rootElement).toMatchSnapshot();
});

test('Checked-attribute should be set when checked', () => {
  const changeHandler = jest.fn();
  render(
    <Checkbox onChange={changeHandler} checked={true}>
      Checkbox
    </Checkbox>,
  );
  const checkbox = screen.getByLabelText('Checkbox');

  expect(checkbox).toHaveAttribute('checked');
});
