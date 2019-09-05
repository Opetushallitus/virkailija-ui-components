import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, select } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import Drawer from './index';
import Typography from '../Typography';

const close = action('close') as any;

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
    <Drawer open={open} anchor={anchor} onClose={close}>
      <Typography p={2} as="div">
        Lorem ipsum dolor sit amet
      </Typography>
    </Drawer>
  );
});
