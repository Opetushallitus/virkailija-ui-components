import * as React from 'react';
import styled, { css } from 'styled-components';
import { uniqueId } from 'lodash';
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

type RadioGroupChild = React.ReactElement<{
  checked?: boolean;
  value: string;
  onChange?: (arg: any) => void;
  disabled?: boolean;
  error?: boolean;
}>;

export type RadioGroupProps = {
  children?: RadioGroupChild[];
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
    const validChildren = React.Children.toArray(childrenProp).filter((c) =>
      React.isValidElement(c),
    ) as RadioGroupChild[];

    const childrenCount = React.Children.count(validChildren);

    children = validChildren.map((child, index) => {
      const checked = value !== undefined && child?.props?.value === value;
      const element = React.cloneElement(child, {
        checked,
        onChange,
        disabled,
        error,
      });

      return (
        <Container
          key={uniqueId('RadioContainer_')}
          isLast={index === childrenCount - 1}
        >
          {element}
        </Container>
      );
    });
  } else if (isArray(options)) {
    children = options.map(({ value: optionValue, label }, index) => (
      <Container isLast={index === options.length - 1} key={optionValue}>
        <Radio
          checked={value !== undefined && value === optionValue}
          onChange={onChange}
          value={optionValue}
          error={error}
          disabled={disabled}
        >
          {label}
        </Radio>
      </Container>
    ));
  }

  return <>{children}</>;
};

export default RadioGroup;
