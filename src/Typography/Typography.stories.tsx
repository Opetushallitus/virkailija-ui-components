import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { select } from '@storybook/addon-knobs';

import Typography from './index';

const stories = storiesOf('Components/Typography', module);

stories.add('Default', () => {
  const variant = select(
    'Variant',
    {
      Body: 'body',
      Secondary: 'secondary',
      H1: 'h1',
      H2: 'h2',
      H3: 'h3',
      H4: 'h4',
      H5: 'h5',
      H6: 'h6',
    },
    'body',
  ) as any;

  return (
    <Typography variant={variant}>
      The quick brown fox jumps over the lazy dog
    </Typography>
  );
});
