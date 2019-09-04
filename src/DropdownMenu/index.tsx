import * as React from 'react';
import styled from 'styled-components';

const DropdownMenu = styled.div.attrs({ role: 'menu' })`
  width: 100%;
  min-width: 200px;
  border: 1px solid ${({ theme }) => theme.colors.divider};
  border-radius: ${({ theme }) => theme.radii[1]}px;
  box-shadow: ${({ theme }) => theme.shadows.dropdownMenu};
  background-color: white;
`;

export type DropdownMenuProps = React.ComponentProps<typeof DropdownMenu>;

export default DropdownMenu;
