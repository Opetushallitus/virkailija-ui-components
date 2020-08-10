import React from 'react';

import Tabs from './index';
import Tab from '../Tab';
import { render } from '../testUtils';

test('Renders correctly with 3 tabs', () => {
  const { rootElement } = render(
    <Tabs value="b">
      <Tab value="a">Tab A</Tab>
      <Tab value="b">Tab B</Tab>
      <Tab value="c">Tab C</Tab>
    </Tabs>,
  );
  expect(rootElement).toMatchSnapshot();
});
