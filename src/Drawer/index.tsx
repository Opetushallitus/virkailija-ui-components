import * as React from 'react';
import { createPortal } from 'react-dom';
import styled, { css } from 'styled-components';
import { useTransition, animated } from 'react-spring';

import ModalOverlay from '../ModalOverlay';

type DrawerAnchor = 'left' | 'right';

const Wrapper = styled.div.attrs({ role: 'dialog' })`
  z-index: ${({ theme }) => theme.zIndices.drawer};
  position: fixed;
  top: 0px;
  left: 0px;
  bottom: 0px;
  right: 0px;
`;

const Content = styled(animated.div)<{ width: string; anchor: DrawerAnchor }>`
  height: 100vh;
  position: fixed;
  width: ${({ width }) => width};
  overflow-y: auto;
  z-index: 2;
  box-shadow: 0px 8px 10px -5px rgba(0, 0, 0, 0.2),
    0px 16px 24px 2px rgba(0, 0, 0, 0.14), 0px 6px 30px 5px rgba(0, 0, 0, 0.12);
  background-color: white;

  ${({ anchor }) =>
    anchor === 'right' &&
    css`
      top: 0px;
      right: 0px;
    `}

  ${({ anchor }) =>
    anchor === 'left' &&
    css`
      top: 0px;
      left: 0px;
    `}
`;

export type DrawerBaseProps = {
  children: React.ReactNode;
  anchor?: DrawerAnchor;
  width?: string;
  open: boolean;
};

type DrawerProps = Omit<
  React.ComponentProps<typeof Content>,
  keyof DrawerBaseProps
> &
  DrawerBaseProps;

const createTarget = (): HTMLDivElement => {
  const target = document.createElement('div');

  document.body.appendChild(target);

  return target;
};

const Drawer = ({
  children,
  width = 'auto',
  open = false,
  anchor = 'right',
  ...props
}: DrawerProps) => {
  const targetRef = React.useRef<HTMLDivElement>();

  if (!targetRef.current) {
    targetRef.current = createTarget();
  }

  React.useEffect(() => {
    return () => {
      targetRef.current && document.body.removeChild(targetRef.current);
    };
  }, []);

  const transform = anchor === 'right' ? 'translateX(50%)' : 'translateX(-50%)';

  const transition = useTransition(open, null, {
    enter: {
      transform: 'translateX(0%)',
      opacity: 1,
    },
    leave: {
      transform,
      opacity: 0,
    },
    from: {
      transform,
      opacity: 0,
    },
  });

  const content = transition.map(({ item, props: transitionProps }) => {
    return item ? (
      <Content
        width={width}
        anchor={anchor}
        {...props}
        style={transitionProps}
        key="1"
      >
        {children}
      </Content>
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

export default Drawer;
