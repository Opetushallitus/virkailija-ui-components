import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, select } from '@storybook/addon-knobs';

import Drawer from './index';
import Typography from '../Typography';

const stories = storiesOf('Components/Drawer', module);

stories.add('Default', () => {
  const open = boolean('Open', true) as boolean;

  const anchor = select(
    'Anchor',
    {
      Left: 'left',
      Right: 'right',
    },
    'right',
  ) as any;

  return (
    <Drawer open={open} anchor={anchor}>
      <Typography p={2} as="div">
        Lorem ipsum dolor sit amet
      </Typography>
    </Drawer>
  );
});
