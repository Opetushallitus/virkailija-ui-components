import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { select, boolean } from '@storybook/addon-knobs';
import Spin from './index';

const stories = storiesOf('Components/Spin', module);

stories.add('Default', () => {
  const color = select(
    'Color',
    {
      White: 'white',
      Primary: 'primary',
    },
    'primary',
  ) as any;

  const size = select(
    'Size',
    {
      Small: 'small',
      Medium: 'medium',
      Large: 'large',
    },
    'small',
  ) as any;

  const disableTypography = boolean('Disable typography', false) as boolean;

  const center = boolean('Center', false) as boolean;

  return (
    <Spin
      color={color}
      size={size}
      disableTypography={disableTypography}
      center={center}
    >
      Ladataan...
    </Spin>
  );
});
