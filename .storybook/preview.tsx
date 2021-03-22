import * as React from 'react';
import { configure, addDecorator } from '@storybook/react';
import { ThemeProvider } from 'styled-components';
import { withInfo } from '@storybook/addon-info';
import { withKnobs } from '@storybook/addon-knobs';

import createTheme from '../src/createTheme';

const themeDecorator = (storyFn: any) => (
  <ThemeProvider theme={createTheme()}>{storyFn()}</ThemeProvider>
);

addDecorator(withInfo);
addDecorator(withKnobs);
addDecorator(themeDecorator);

const req = require.context('../src', true, /.stories.tsx$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
