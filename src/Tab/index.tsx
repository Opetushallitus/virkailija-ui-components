import * as React from 'react';
import styled, { css } from 'styled-components';

import { disabledStyle } from '../system';

const TabBase = styled.button.attrs({ role: 'tab' })<{
  active: boolean;
  disabled: boolean;
}>`
  outline: none;
  background-color: transparent;
  border: 0px none;
  cursor: pointer;
  transition: color 0.25s, border-color 0.25s;
  display: inline-flex;
  border-bottom: 3px solid transparent;
  padding: 6px 20px;

  ${({ theme }) => theme.typography.body};
  font-weight: ${({ theme }) => theme.fontWeights.bold};

  &:hover,
  &active {
    color: ${({ theme }) => theme.colors.primary.main};
  }

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary.focusOutline};
  }

  ${disabledStyle}

  ${({ active }) =>
    active &&
    css`
      color: ${({ theme }) => theme.colors.primary.main};

      &,
      &:focus {
        border-color: ${({ theme }) => theme.colors.primary.main};
      }
    `};
`;

type TabBaseProps = {
  active?: boolean;
  value?: string;
  disabled?: boolean;
};

export type TabProps = Omit<
  React.ComponentProps<typeof TabBase>,
  keyof TabBaseProps
> &
  TabBaseProps;

const Tab = React.forwardRef<HTMLButtonElement, TabProps>(
  ({ active = false, disabled = false, ...props }, ref) => {
    return <TabBase active={active} disabled={disabled} ref={ref} {...props} />;
  },
);

export default Tab;
