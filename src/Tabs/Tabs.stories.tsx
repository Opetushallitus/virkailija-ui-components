import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, select } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import Tabs from './index';
import Tab from '../Tab';

const change = action('change') as any;

const stories = storiesOf('Components/Tabs', module);

stories.add('Default', () => {
  const fullWidth = boolean('Full width', true) as boolean;

  const alignTabs = select(
    'Align tabs',
    {
      Start: 'start',
      Center: 'center',
      End: 'end',
    },
    'start',
  ) as any;

  return (
    <Tabs
      value="2"
      onChange={change}
      fullWidth={fullWidth}
      alignTabs={alignTabs}
    >
      <Tab value="1">Tab 1</Tab>
      <Tab value="2">Tab 2</Tab>
      <Tab value="3">Tab 3</Tab>
    </Tabs>
  );
});
