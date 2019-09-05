import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean } from '@storybook/addon-knobs';

import FormControl from './index';
import Input from '../Input';

const stories = storiesOf('Components/FormControl', module);

stories.add('Default', () => {
  const disabled = boolean('Disabled', false) as boolean;
  const error = boolean('Error', false) as boolean;

  return (
    <FormControl
      disabled={disabled}
      error={error}
      label="Sähköposti"
      helperText="Syötä kenttään sähköpostiosoitteesi"
    >
      <Input />
    </FormControl>
  );
});
