import * as React from 'react';
import { storiesOf } from '@storybook/react';
import Select from './index';
import { boolean } from '@storybook/addon-knobs';

const stories = storiesOf('Components/Select', module);

const options = [
  { label: 'Option 1', value: 'option_1' },
  { label: 'Option 2', value: 'option_2' },
  { label: 'Disabled 1', value: 'disabled_1', isDisabled: true },
] as { label: string; value: string }[];

stories.add('Default', () => {
  const error = boolean('Error', false) as boolean;

  return <Select options={options} error={error} />;
});
