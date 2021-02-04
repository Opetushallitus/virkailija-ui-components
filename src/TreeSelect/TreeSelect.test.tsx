import React from 'react';
import { screen } from '@testing-library/react';
import { render } from '../testUtils';
import TreeSelect from './index';

const tree = [
  {
    value: 'root',
    label: 'root',
    children: [
      {
        value: 'child1',
        label: 'child1',
        children: [
          {
            value: 'child1.1',
            label: 'child1.1',
          },
        ],
      },
    ],
  },
];

it('Should select ancestors automatically when disableAutoSelect is not set', () => {
  const changeHandler = jest.fn();

  render(<TreeSelect options={tree} onChange={changeHandler} value={[]} />);

  screen.getByLabelText('child1').click();
  expect(changeHandler).toHaveBeenCalledWith(['root', 'child1', 'child1.1']);
});

it('Should only select the clicked item  when disableAutoSelect is true', () => {
  const changeHandler = jest.fn();

  render(
    <TreeSelect
      options={tree}
      disableAutoSelect={true}
      onChange={changeHandler}
      value={[]}
    />,
  );

  screen.getByLabelText('child1').click();
  expect(changeHandler).toHaveBeenCalledWith(['child1']);
});
