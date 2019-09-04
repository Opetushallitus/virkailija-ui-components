import * as React from 'react';
import { storiesOf } from '@storybook/react';

import Divider from './index';

const stories = storiesOf('Components/Divider', module);

stories.add('Default', () => (
  <>
    Lorem ipsum dolor sit amet
    <Divider my={2} />
    Lorem ipsum dolor sit amet
  </>
));
