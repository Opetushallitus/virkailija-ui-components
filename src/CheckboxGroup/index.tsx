import * as React from 'react';
import styled from 'styled-components';

import Checkbox from '../Checkbox';
import isArray from '../utils/isArray';

const Container = styled.div<{ isLast: boolean }>`
  ${({ isLast }) => !isLast && { marginBottom: '4px' }}
`;

type CheckboxGroupOption = {
  value: string;
  label: React.ReactNode;
  disabled?: boolean;
};

const cleanValue = (
  value: string[],
  options: CheckboxGroupOption[],
  keepOldValuesOnChange: boolean,
): string[] => {
  const optionValues = options.map(({ value }) => value);

  if (!isArray(options) || !isArray(value)) {
    return value;
  }

  if (keepOldValuesOnChange) {
    return value;
  } else {
    return value.filter((v) => optionValues.indexOf(v) >= 0);
  }
};

const makeOnCheckboxChange = ({
  value,
  onChange,
  optionValue,
  options,
  keepOldValuesOnChange,
}: {
  value: string[];
  onChange: (value: string[]) => void;
  optionValue: string;
  options: CheckboxGroupOption[];
  keepOldValuesOnChange: boolean;
}) => (e: React.ChangeEvent<HTMLInputElement>) => {
  if (e.target.checked) {
    onChange(
      cleanValue([...value, optionValue], options, keepOldValuesOnChange),
    );
  } else {
    onChange(
      cleanValue(
        value.filter((v) => v !== optionValue),
        options,
        keepOldValuesOnChange,
      ),
    );
  }
};

export type CheckboxGroupProps = {
  value: string[];
  onChange?: (value: string[]) => void;
  options?: CheckboxGroupOption[];
  error?: boolean;
  disabled?: boolean;
  keepOldValuesOnChange: boolean;
};

const CheckboxGroup = ({
  value = [],
  onChange = () => {},
  options = [],
  error = false,
  disabled = false,
  keepOldValuesOnChange = false,
}: CheckboxGroupProps) => {
  return (
    <>
      {options.map(
        ({ value: optionValue, label, disabled: optionDisabled }, index) => (
          <Container key={optionValue} isLast={index === options.length - 1}>
            <Checkbox
              checked={value.indexOf(optionValue) >= 0}
              onChange={makeOnCheckboxChange({
                value,
                onChange,
                optionValue,
                options,
                keepOldValuesOnChange,
              })}
              disabled={optionDisabled || disabled}
              name={optionValue}
              error={error}
            >
              {label}
            </Checkbox>
          </Container>
        ),
      )}
    </>
  );
};

export default CheckboxGroup;
