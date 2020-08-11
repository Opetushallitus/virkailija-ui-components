import * as React from 'react';
import { render } from '../testUtils';
import Typography from './index';

test('renders correctly', () => {
  const { rootElement } = render(<Typography>Hello world!</Typography>);
  expect(rootElement).toMatchSnapshot();
});

test('renders correctly with variant', () => {
  const { rootElement } = render(
    <>
      <Typography variant="body">Body</Typography>
      <Typography variant="h1">Heading 1</Typography>
      <Typography variant="h2">Heading 2</Typography>
      <Typography variant="h3">Heading 3</Typography>
      <Typography variant="h4">Heading 4</Typography>
      <Typography variant="h5">Heading 5</Typography>
      <Typography variant="h6">Heading 6</Typography>
    </>,
  );

  expect(rootElement).toMatchSnapshot();
});
