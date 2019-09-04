import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean } from '@storybook/addon-knobs';
import Tab from './index';

const stories = storiesOf('Components/Tab', module);

stories.add('Default', () => {
  const active = boolean('Active', false) as boolean;
  const disabled = boolean('Disabled', false) as boolean;

  return (
    <Tab active={active} disabled={disabled}>
      Tab
    </Tab>
  );
});
