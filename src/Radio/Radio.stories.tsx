import * as React from 'react';
import { storiesOf } from '@storybook/react';
import Radio from './index';
import { boolean } from '@storybook/addon-knobs';

const stories = storiesOf('Components/Radio', module);

stories.add('Default', () => {
  const disabled = boolean('Disabled', false) as boolean;
  const error = boolean('Error', false) as boolean;
  const checked = boolean('Checked', false) as boolean;
  const fullWidth = boolean('Full width', true) as boolean;

  return (
    <Radio
      disabled={disabled}
      error={error}
      fullWidth={fullWidth}
      checked={checked}
    >
      Radio
    </Radio>
  );
});
