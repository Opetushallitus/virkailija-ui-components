import * as React from 'react';
import { storiesOf } from '@storybook/react';

import VirkalijaRaamit from './index';

const stories = storiesOf('Components/VirkailijaRaamit', module);

const raamitUrl =
  'https://virkailija.hahtuvaopintopolku.fi/virkailija-raamit/apply-raamit.js';

stories.add('Default', () => {
  return <VirkalijaRaamit scriptUrl={raamitUrl} />;
});
