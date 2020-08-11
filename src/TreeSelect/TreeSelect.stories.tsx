import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { boolean } from '@storybook/addon-knobs';

import TreeSelect from './index';

const change = action('change') as any;

const stories = storiesOf('Components/TreeSelect', module);

const options = [
  {
    label: 'Option 1',
    value: '1',
    children: [
      {
        label: 'Option 1.1',
        value: '1.1',
        children: [{ label: 'Option 1.1.1', value: '1.1.1' }],
      },
      { label: 'Option 1.2', value: '1.2', disabled: true },
    ],
  },
  {
    label: 'Option 2',
    value: '2',
    children: [{ label: 'Option 2.1', value: '2.1' }],
  },
];

const Story = () => {
  const error = boolean('Error', false) as boolean;

  const [value, setValue] = React.useState<string[]>([]);

  return (
    <TreeSelect
      options={options}
      value={value}
      error={error}
      onChange={(v) => {
        setValue(v);
        change(v);
      }}
    />
  );
};

stories.add('Default', () => {
  return <Story />;
});
