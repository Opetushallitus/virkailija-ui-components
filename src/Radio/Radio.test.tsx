import React from 'react';
import { render } from '../testUtils';
import Radio from './index';

it('Renders a radio button', () => {
  const { rootElement } = render(
    <Radio onChange={() => {}} value="a">
      Radio button
    </Radio>,
  );
  expect(rootElement).toMatchSnapshot();
});
