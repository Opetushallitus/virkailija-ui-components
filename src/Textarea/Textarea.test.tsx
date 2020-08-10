import React from 'react';
import { render } from '../testUtils';
import Textarea from './index';

it('Renders correctly with defaults', () => {
  const { rootElement } = render(<Textarea />);
  expect(rootElement).toMatchSnapshot();
});
