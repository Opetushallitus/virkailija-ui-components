import * as React from 'react';
import { storiesOf } from '@storybook/react';
import Button from './index';
import { select, boolean } from '@storybook/addon-knobs';

const stories = storiesOf('Components/Button', module);

stories.add('Default', () => {
  const variant = select(
    'Variant',
    {
      Contained: 'contained',
      Outlined: 'outlined',
      Text: 'text',
    },
    'contained',
  ) as any;

  const color = select(
    'Color',
    {
      Primary: 'primary',
      Secondary: 'secondary',
      Success: 'success',
      Danger: 'danger',
    },
    'primary',
  ) as any;

  const size = select(
    'Size',
    {
      Small: 'small',
      Medium: 'medium',
    },
    'medium',
  ) as any;

  const disabled = boolean('Disabled', false) as boolean;

  const fullWidth = boolean('Full width', false) as boolean;

  return (
    <Button
      variant={variant}
      color={color}
      size={size}
      disabled={disabled}
      fullWidth={fullWidth}
    >
      Button
    </Button>
  );
});
