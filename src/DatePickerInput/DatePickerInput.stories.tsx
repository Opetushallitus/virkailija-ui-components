import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import DatePickerInput from './index';

const change = action('change') as any;

const stories = storiesOf('Components/DatePickerInput', module);

stories.add('Default', () => (
  <DatePickerInput value={new Date()} onChange={change} />
));
