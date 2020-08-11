import React from 'react';
import { render } from '../testUtils';
import HtmlButton from './index';

it('Renders a HtmlButton', () => {
  const { rootElement } = render(<HtmlButton>test</HtmlButton>);
  expect(rootElement).toMatchSnapshot();
});
