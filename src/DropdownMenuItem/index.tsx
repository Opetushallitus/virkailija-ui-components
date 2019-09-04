import * as React from 'react';
import styled from 'styled-components';

const DropdownMenuItem = styled.div.attrs({ role: 'menuitem' })`
  display: block;
  width: 100%;
  white-space: nowrap;
  padding: 6px 12px;
  box-sizing: border-box;
  cursor: pointer;
  transition: background-color 0.25s, color 0.25s;

  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }

  ${({ theme }) => theme.typography.body}
`;

export type DropdownMenuItemProps = React.ComponentProps<
  typeof DropdownMenuItem
>;

export default DropdownMenuItem;
