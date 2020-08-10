import React from 'react';

import Input from './index';
import { render } from '../testUtils';

test('Renders correctly with defaults', () => {
  const { rootElement } = render(<Input />);
  expect(rootElement).toMatchSnapshot();
});
