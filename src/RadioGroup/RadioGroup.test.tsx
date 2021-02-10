import React from 'react';
import { screen } from '@testing-library/react';
import { render } from '../testUtils';
import Radio from '../Radio';
import RadioGroup from './index';

it('Renders a RadioGroup with 3 radio buttons', () => {
  const { rootElement } = render(
    <RadioGroup value="b" onChange={() => {}}>
      <Radio value="a">Radio A</Radio>
      <Radio value="b">Radio B</Radio>
      <Radio value="c">Radio C</Radio>
    </RadioGroup>,
  );
  expect(rootElement).toMatchSnapshot();
});

it('Renders individual radio buttons disabled using disabled-attribute', () => {
  render(
    <RadioGroup value="b" onChange={() => {}}>
      <Radio disabled={true} value="a">
        Radio A
      </Radio>
      <Radio value="b">Radio B</Radio>
      <Radio value="c">Radio C</Radio>
    </RadioGroup>,
  );

  expect(screen.getByLabelText('Radio A')).toHaveAttribute('disabled');
  expect(screen.getByLabelText('Radio B')).not.toHaveAttribute('disabled');
  expect(screen.getByLabelText('Radio C')).not.toHaveAttribute('disabled');
});

it('Renders individual radio buttons disabled using getIsDisabled-attribute', () => {
  render(
    <RadioGroup
      value="b"
      onChange={() => {}}
      getIsDisabled={(value) => value === 'a'}
    >
      <Radio value="a">Radio A</Radio>
      <Radio value="b">Radio B</Radio>
      <Radio value="c">Radio C</Radio>
    </RadioGroup>,
  );

  expect(screen.getByLabelText('Radio A')).toHaveAttribute('disabled');
  expect(screen.getByLabelText('Radio B')).not.toHaveAttribute('disabled');
  expect(screen.getByLabelText('Radio C')).not.toHaveAttribute('disabled');
});

it('Renders individual radio buttons disabled using getIsDisabled-attribute (options-attribute)', () => {
  render(
    <RadioGroup
      value="b"
      onChange={() => {}}
      options={[
        { label: 'Radio A', value: 'a' },
        { label: 'Radio B', value: 'b' },
        { label: 'Radio C', value: 'c' },
      ]}
      getIsDisabled={(value) => value === 'a'}
    />,
  );

  expect(screen.getByLabelText('Radio A')).toHaveAttribute('disabled');
  expect(screen.getByLabelText('Radio B')).not.toHaveAttribute('disabled');
  expect(screen.getByLabelText('Radio C')).not.toHaveAttribute('disabled');
});

it('Renders all radio buttons disabled when RadioGroup disabled-attibute is true', () => {
  render(
    <RadioGroup
      value="b"
      disabled={true}
      onChange={() => {}}
      getIsDisabled={(value) => value === 'a'}
    >
      <Radio value="a">Radio A</Radio>
      <Radio disabled={true} value="b">
        Radio B
      </Radio>
      <Radio value="c">Radio C</Radio>
    </RadioGroup>,
  );

  expect(screen.getByLabelText('Radio A')).toHaveAttribute('disabled');
  expect(screen.getByLabelText('Radio B')).toHaveAttribute('disabled');
  expect(screen.getByLabelText('Radio C')).toHaveAttribute('disabled');
});
