import * as React from 'react';
import { storiesOf } from '@storybook/react';

import Typography from '../Typography';
const stories = storiesOf('Theme', module);

stories.add('Default', () => {
  return (
    <Typography>
      Default theme object can be found in the development console
    </Typography>
  );
});
