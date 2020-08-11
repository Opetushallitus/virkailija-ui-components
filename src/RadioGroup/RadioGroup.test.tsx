import React from 'react';
import { render } from '../testUtils';
import Radio from '../Radio';
import RadioGroup from './index';

it('Renders a RadioGroup with 3 radio buttons', () => {
  const { rootElement } = render(
    <RadioGroup value="b" onChange={() => {}}>
      <Radio value="a">Radio A</Radio>
      <Radio value="b">Radio B</Radio>
      <Radio value="c">Radio C</Radio>
    </RadioGroup>,
  );
  expect(rootElement).toMatchSnapshot();
});
