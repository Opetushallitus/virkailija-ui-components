import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean } from '@storybook/addon-knobs';

import Icon from '../Icon';
import BlankCheckbox from './index';

const stories = storiesOf('Components/BlankCheckbox', module);

stories.add('Default', () => {
  const checked = boolean('Checked', false) as boolean;

  return (
    <BlankCheckbox
      checked={checked}
      icon={<Icon type="star_border" color="text.secondary" />}
      checkedIcon={<Icon type="star" color="primary.main" />}
    />
  );
});
