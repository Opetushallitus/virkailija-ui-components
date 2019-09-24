import * as React from 'react';
import styled from 'styled-components';
import { hideVisually } from 'polished';

const HiddenRadio = styled.input.attrs({ type: 'radio' })`
  ${hideVisually}
`;

type BlankRadioBaseProps = {
  disabled?: boolean;
  checked?: boolean;
  children?: React.ReactNode;
  error?: boolean;
  icon?: React.ReactNode;
  checkedIcon?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

export type BlankRadioProps = BlankRadioBaseProps &
  Omit<React.ComponentProps<typeof HiddenRadio>, keyof BlankRadioBaseProps>;

const BlankRadio = React.forwardRef<HTMLInputElement, BlankRadioProps>(
  (
    {
      className,
      checked = false,
      icon,
      checkedIcon,
      children,
      style,
      ...props
    }: BlankRadioProps,
    ref,
  ) => (
    <label className={className} style={style}>
      <HiddenRadio checked={checked} ref={ref} {...props} />
      {checked ? checkedIcon : icon}
      {children}
    </label>
  ),
);

export default BlankRadio;
