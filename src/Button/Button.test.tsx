import React from 'react';

import Button from './index';
import { render, fireEvent } from '../testUtils';

test('Renders correctly with defaults', () => {
  const { rootElement } = render(<Button>Default button</Button>);
  expect(rootElement).toMatchSnapshot();
});

test('Renders correctly with custom size, variant, and color', () => {
  const { rootElement } = render(
    <Button size="small" variant="outlined" color="secondary">
      Small outlined secondary button
    </Button>,
  );
  expect(rootElement).toMatchSnapshot();
});

test('Renders correctly with custom component ("as"-prop)', () => {
  const CustomButton = (props = {}) => <div {...props} />;
  const { rootElement } = render(
    <Button as={CustomButton}>Button with custom component</Button>,
  );
  expect(rootElement).toMatchSnapshot();
});

test('Calls onClick when clicked', () => {
  const handleClick = jest.fn();
  const { rootElement } = render(
    <Button onClick={handleClick}>Click me!</Button>,
  );

  fireEvent.click(rootElement);
  expect(handleClick).toBeCalledTimes(1);
  expect(rootElement).toMatchSnapshot();
});

test('Disabled button cannot be interacted with', () => {
  const handleClick = jest.fn();
  const { rootElement } = render(
    <Button onClick={handleClick} disabled={true}>
      Click me!
    </Button>,
  );

  expect(handleClick).not.toBeCalled();
  expect(rootElement).toMatchSnapshot();
});

test('Loading state button cannot be interacted with', () => {
  const handleClick = jest.fn();
  const { rootElement } = render(
    <Button onClick={handleClick} loading={true}>
      Click me!
    </Button>,
  );
  const children = rootElement.childNodes;
  expect(handleClick).not.toBeCalled();
  expect(rootElement).toMatchSnapshot();
});

test('Loading state button displays Oph Spinner', () => {
  const { rootElement } = render(<Button loading={true}>Click me!</Button>);
  const children = rootElement.childNodes;
  expect((children[2] as HTMLDivElement).getAttribute('class')).toContain(
    'Oph-Spinner',
  );
  expect(rootElement).toMatchSnapshot();
});
