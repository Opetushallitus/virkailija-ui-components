import styled from 'styled-components';

import { space, SpaceProps } from '../system';

const Divider = styled.div<SpaceProps>`
  width: 100%;
  height: 1px;
  background-color: ${({ theme }) => theme.colors.divider};
  ${space};
`;

export type DividerProps = React.ComponentProps<typeof Divider>;

export default Divider;
