import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean } from '@storybook/addon-knobs';

import Input from './index';
import InputIcon from '../InputIcon';

const stories = storiesOf('Components/Input', module);

stories.add('Default', () => {
  const disabled = boolean('Disabled', false) as boolean;
  const error = boolean('Error', false) as boolean;

  return <Input disabled={disabled} error={error} placeholder="Input" />;
});

stories.add('With prefix', () => (
  <Input placeholder="Prefix" prefix={<InputIcon type="email" />} />
));

stories.add('With suffix', () => (
  <Input placeholder="Suffix" suffix={<InputIcon type="search" />} />
));
