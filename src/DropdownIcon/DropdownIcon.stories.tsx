import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';

import DropdownIcon from './index';

const stories = storiesOf('Components/DropdownIcon', module);

stories.add('Basic', () => {
  const [open, setOpen] = useState(false);

  return <DropdownIcon open={open} onClick={() => setOpen((open) => !open)} />;
});
