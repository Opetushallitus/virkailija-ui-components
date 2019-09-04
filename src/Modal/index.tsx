import * as React from 'react';
import { createPortal } from 'react-dom';
import styled, { css } from 'styled-components';
import { useTransition, animated } from 'react-spring';

import ModalOverlay from '../ModalOverlay';

const Wrapper = styled.div.attrs({ role: 'dialog' })`
  z-index: ${({ theme }) => theme.zIndices.modal};
  position: fixed;
  top: 0px;
  left: 0px;
  bottom: 0px;
  right: 0px;
`;

const ContentWrapper = styled(animated.div)`
  position: absolute;
  z-index: 2;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  display: flex;
  box-sizing: border-box;
  padding: ${({ theme }) => theme.space[2]}px;
`;

const Content = styled.div<{ fullWidth: boolean; maxWidth: string }>`
  width: 100%;
  position: relative;
  background-color: white;
  background-color: white;
  border-radius: ${({ theme }) => theme.radii[1]}px;
  box-shadow: 0px 11px 15px -7px rgba(0, 0, 0, 0.2),
    0px 24px 38px 3px rgba(0, 0, 0, 0.14), 0px 9px 46px 8px rgba(0, 0, 0, 0.12);

  ${({ fullWidth, maxWidth }) =>
    !fullWidth &&
    css`
      max-width: ${maxWidth};
    `}
`;

type ModalBaseProps = {
  children: React.ReactNode;
  maxWidth?: string;
  fullWidth?: boolean;
  open: boolean;
};

type ModalProps = Omit<
  React.ComponentProps<typeof Content>,
  keyof ModalBaseProps
> &
  ModalBaseProps;

const createTarget = (): HTMLDivElement => {
  const target = document.createElement('div');

  document.body.appendChild(target);

  return target;
};

const Modal = ({
  children,
  maxWidth = '720px',
  fullWidth = false,
  open = false,
  ...props
}: ModalProps) => {
  const targetRef = React.useRef<HTMLDivElement>();

  if (!targetRef.current) {
    targetRef.current = createTarget();
  }

  React.useEffect(() => {
    return () => {
      targetRef.current && document.body.removeChild(targetRef.current);
    };
  }, []);

  const transition = useTransition(open, null, {
    enter: {
      transform: 'scale(1)',
      opacity: 1,
    },
    leave: {
      transform: 'scale(0.5)',
      opacity: 0,
    },
    from: {
      transform: 'scale(0.5)',
      opacity: 0,
    },
  });

  const content = transition.map(({ item, props: transitionProps }) => {
    return item ? (
      <ContentWrapper style={transitionProps} key="1">
        <Content maxWidth={maxWidth} fullWidth={fullWidth} {...props}>
          {children}
        </Content>
      </ContentWrapper>
    ) : null;
  });

  return createPortal(
    <Wrapper>
      <ModalOverlay open={open} />
      {content}
    </Wrapper>,
    targetRef.current!,
  );
};

export default Modal;
