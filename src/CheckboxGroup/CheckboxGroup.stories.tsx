import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import CheckboxGroup from './index';

const change = action('change') as any;

const stories = storiesOf('Components/CheckboxGroup', module);

stories.add('Default', () => {
  const disabled = boolean('Disabled', false) as boolean;
  const error = boolean('Error', false) as boolean;

  return (
    <CheckboxGroup
      value={['1']}
      disabled={disabled}
      error={error}
      options={[
        { value: '1', label: 'Checkbox 1' },
        { value: '2', label: 'Checkbox 2' },
        { value: '3', label: 'Checkbox 3' },
      ]}
      onChange={change}
    />
  );
});
