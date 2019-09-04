import * as React from 'react';
import styled, { css } from 'styled-components';

import isArray from '../utils/isArray';
import Radio from '../Radio';

const Container = styled.div<{ isLast: boolean }>`
  ${({ isLast }) =>
    !isLast &&
    css`
      margin-bottom: 4px;
    `}
`;

type RadioGroupOption = { value: string; label: React.ReactNode };

export type RadioGroupProps = {
  children?: React.ReactElement<{
    checked?: boolean;
    value: string;
    onChange?: (arg: any) => void;
    disabled?: boolean;
    error?: boolean;
  }>[];
  value: string;
  onChange?: (arg: any) => void;
  disabled?: boolean;
  error?: boolean;
  options?: RadioGroupOption[];
};

export const RadioGroup = ({
  value,
  onChange,
  disabled = false,
  options,
  error = false,
  children: childrenProp,
}: RadioGroupProps) => {
  let children: React.ReactNode = null;

  if (childrenProp) {
    const validChildren = React.Children.toArray(childrenProp).filter(c =>
      React.isValidElement(c),
    );

    const childrenCount = React.Children.count(validChildren);

    children = React.Children.map(validChildren, (child, index) => {
      const checked = value !== undefined && child.props.value === value;
      const element = React.cloneElement(child, {
        checked,
        onChange,
        disabled,
        error,
      });

      const isLast = index === childrenCount - 1;

      return <Container isLast={isLast}>{element}</Container>;
    });
  } else if (isArray(options)) {
    children = options.map(({ value: optionValue, label }, index) => (
      <Container isLast={index === options.length - 1} key={optionValue}>
        <Radio
          checked={value !== undefined && value === optionValue}
          onChange={onChange}
          value={optionValue}
          error={error}
        >
          {label}
        </Radio>
      </Container>
    ));
  }

  return <>{children}</>;
};

export default RadioGroup;
