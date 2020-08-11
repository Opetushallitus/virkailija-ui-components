import React from 'react';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { createTheme } from './createTheme';

const theme = createTheme();

const Providers = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

const dummyDiv = document.createElement('div');
dummyDiv.setAttribute('data-nothing', 'true');

// Return rootElement from render() for easier snapshot testing
const customRender = (ui: React.ReactElement, options: any = {}) => {
  const result = render(ui, { wrapper: Providers, ...options });
  return {
    ...result,
    rootElement: result.container.firstChild || dummyDiv,
  };
};

export * from '@testing-library/react';

export { customRender as render };
