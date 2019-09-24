import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean } from '@storybook/addon-knobs';

import Icon from '../Icon';
import BlankRadio from './index';

const stories = storiesOf('Components/BlankRadio', module);

stories.add('Default', () => {
  const checked = boolean('Checked', false) as boolean;

  return (
    <BlankRadio
      checked={checked}
      icon={<Icon type="favorite_border" color="text.secondary" />}
      checkedIcon={<Icon type="favorite" color="primary.main" />}
    />
  );
});
