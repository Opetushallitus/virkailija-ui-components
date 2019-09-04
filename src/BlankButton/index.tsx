import styled from 'styled-components';

import HtmlButton from '../HtmlButton';

const BlankButton = styled(HtmlButton)`
  padding: 0px;
  margin: 0px;
  border: 0px none;
  outline: none;
  font-family: inherit;
  color: inherit;
  background-color: transparent;
  cursor: pointer;
`;

export type BlankButtonProps = React.ComponentProps<typeof BlankButton>;

export default BlankButton;
