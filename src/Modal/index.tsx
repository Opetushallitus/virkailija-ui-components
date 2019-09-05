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

const Content = styled(animated.div)<{ fullWidth: boolean; maxWidth: string }>`
  width: 100%;
  z-index: 2;
  position: relative;
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
  onClose?: () => void;
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
  onClose = () => {},
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

  const content = transition.map(({ item, props: transitionProps, key }) => {
    return item ? (
      <Wrapper key={key}>
        <ContentWrapper>
          <ModalOverlay
            onClick={onClose}
            style={{ opacity: transitionProps.opacity }}
          />
          <Content
            maxWidth={maxWidth}
            fullWidth={fullWidth}
            style={transitionProps}
            {...props}
          >
            {children}
          </Content>
        </ContentWrapper>
      </Wrapper>
    ) : null;
  });

  return createPortal(content, targetRef.current!);
};

export default Modal;
