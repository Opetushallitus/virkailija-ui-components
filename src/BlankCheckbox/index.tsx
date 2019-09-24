import * as React from 'react';
import styled from 'styled-components';
import { hideVisually } from 'polished';

const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  ${hideVisually}
`;

type BlankCheckboxBaseProps = {
  disabled?: boolean;
  checked?: boolean;
  children?: React.ReactNode;
  error?: boolean;
  icon?: React.ReactNode;
  checkedIcon?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

export type BlankCheckboxProps = BlankCheckboxBaseProps &
  Omit<
    React.ComponentProps<typeof HiddenCheckbox>,
    keyof BlankCheckboxBaseProps
  >;

const BlankCheckbox = React.forwardRef<HTMLInputElement, BlankCheckboxProps>(
  (
    {
      className,
      checked = false,
      icon,
      checkedIcon,
      children,
      style,
      ...props
    }: BlankCheckboxProps,
    ref,
  ) => (
    <label className={className} style={style}>
      <HiddenCheckbox checked={checked} ref={ref} {...props} />
      {checked ? checkedIcon : icon}
      {children}
    </label>
  ),
);

export default BlankCheckbox;
