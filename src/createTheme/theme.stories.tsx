import * as React from 'react';
import { storiesOf } from '@storybook/react';

import Typography from '../Typography';
import createTheme from './index';

const stories = storiesOf('Theme', module);

stories.add('Default', () => {
  console.log(createTheme());

  return (
    <Typography>
      Default theme object can be found in the development console
    </Typography>
  );
});
