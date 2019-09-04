import * as React from 'react';
import { storiesOf } from '@storybook/react';

import DatePicker from './index';

const stories = storiesOf('Components/DatePicker', module);

stories.add('Default', () => <DatePicker value={new Date()} />);
