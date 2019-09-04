import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import RadioGroup from './index';
import Radio from '../Radio';

const change = action('change') as any;

const stories = storiesOf('Components/RadioGroup', module);

stories.add('Default', () => {
  const disabled = boolean('Disabled', false) as boolean;
  const error = boolean('Error', false) as boolean;

  return (
    <RadioGroup value="1" onChange={change} error={error} disabled={disabled}>
      <Radio value="1">Radio 1</Radio>
      <Radio value="2">Radio 2</Radio>
      <Radio value="3">Radio 3</Radio>
    </RadioGroup>
  );
});

stories.add('With options prop', () => {
  return (
    <RadioGroup
      value="1"
      options={[
        { value: '1', label: 'Radio 1' },
        { value: '2', label: 'Radio 2' },
        { value: '3', label: 'Radio 3' },
      ]}
      onChange={change}
    />
  );
});
