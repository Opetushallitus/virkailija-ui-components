import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { boolean } from '@storybook/addon-knobs';

import Pagination from './index';

const change = action('change') as any;

const stories = storiesOf('Components/Pagination', module);

stories.add('Default', () => {
  const disabled = boolean('Disabled', false) as boolean;

  return (
    <Pagination
      value={0}
      pageCount={5}
      onChange={change}
      disabled={disabled}
      nextButtonText="Next"
      previousButtonText="Previous"
    />
  );
});
