import React from 'react';
import { render } from '../testUtils';
import Icon from './index';

it('Renders an icon', () => {
  const { rootElement } = render(<Icon type="flag" />);
  expect(rootElement).toMatchSnapshot();
});

it('Renders an outlined icon', () => {
  const { rootElement } = render(<Icon type="flag" variant="outlined" />);
  expect(rootElement).toMatchSnapshot();
});
