import * as React from 'react';
import styled from 'styled-components';
import { useTransition, animated } from 'react-spring';

const Overlay = styled(animated.div)`
  background-color: ${({ theme }) => theme.colors.modalOverlay};
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  z-index: 1;
`;

type ModalOverlayProps = React.ComponentProps<typeof Overlay> & {
  open: boolean;
};

const ModalOverlay = ({ open = false, ...props }: ModalOverlayProps) => {
  const overlayTransition = useTransition(open, null, {
    enter: {
      opacity: 1,
    },
    leave: {
      opacity: 0,
    },
    from: {
      opacity: 0,
    },
  });

  const overlay = overlayTransition.map(({ item, props: transitionProps }) => {
    return item ? <Overlay style={transitionProps} key="1" /> : null;
  });

  return <>{overlay}</>;
};

export default ModalOverlay;
