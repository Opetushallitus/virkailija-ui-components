import * as React from 'react';
import { storiesOf } from '@storybook/react';

import Icon from './index';

const stories = storiesOf('Components/Icon', module);

stories.add('Default', () => (
  <>
    <Icon type="remove" color="danger.main" fontSize="1.25rem" />
    <Icon type="add" color="success.main" ml={2} />
  </>
));
