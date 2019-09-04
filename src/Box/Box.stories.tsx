import * as React from 'react';
import { storiesOf } from '@storybook/react';

import Box from './index';

const stories = storiesOf('Components/Box', module);

stories.add('Default', () => <Box>Lorem ipsum dolor sit</Box>);
