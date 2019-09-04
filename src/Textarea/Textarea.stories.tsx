import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean } from '@storybook/addon-knobs';

import Textarea from './index';

const stories = storiesOf('Components/Textarea', module);

stories.add('Default', () => {
  const disabled = boolean('Disabled', false) as boolean;
  const error = boolean('Error', false) as boolean;

  return <Textarea disabled={disabled} error={error} placeholder="Textarea" />;
});
