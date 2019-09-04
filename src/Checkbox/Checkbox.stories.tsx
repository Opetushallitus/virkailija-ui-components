import * as React from 'react';
import { storiesOf } from '@storybook/react';
import Checkbox from './index';
import { boolean } from '@storybook/addon-knobs';

const stories = storiesOf('Components/Checkbox', module);

stories.add('Default', () => {
  const disabled = boolean('Disabled', false) as boolean;
  const error = boolean('Error', false) as boolean;
  const checked = boolean('Checked', false) as boolean;
  const intederminate = boolean('Intederminate', false) as boolean;

  return (
    <Checkbox
      disabled={disabled}
      error={error}
      checked={checked}
      indeterminate={intederminate}
    >
      Checkbox
    </Checkbox>
  );
});
