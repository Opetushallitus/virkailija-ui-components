import * as React from 'react';
import { createPortal } from 'react-dom';
import { useTransition, animated } from 'react-spring';
import EventListener from 'react-event-listener';
import Popper from 'popper.js';

import isFunction from '../utils/isFunction';
import usePopper from '../usePopper';

const getMarginStyle = (placement: string): React.CSSProperties => {
  if (!placement) {
    return {};
  }

  if (/^bottom/.test(placement)) {
    return {
      marginTop: '6px',
    };
  }

  if (/^top/.test(placement)) {
    return {
      marginBottom: '6px',
    };
  }

  if (/^right/.test(placement)) {
    return {
      marginLeft: '6px',
    };
  }

  if (/^left/.test(placement)) {
    return {
      marginRight: '6px',
    };
  }

  return {};
};

type DropdownDialogProps = {
  [x: string]: any;
  overlay: React.ReactNode;
  open: boolean;
  placement: Popper.Placement;
  style: React.CSSProperties;
};

const DropdownDialog = React.forwardRef<HTMLDivElement, DropdownDialogProps>(
  ({ overlay, open, placement, style, ...props }, ref) => {
    const transitions = useTransition(open, null, {
      enter: {
        opacity: 1,
        transform: 'scaleY(1)',
      },
      leave: {
        opacity: 0,
        transform: 'scaleY(0.9)',
      },
      from: {
        opacity: 0,
        transform: 'scaleY(0.9)',
      },
    });

    return (
      <>
        {transitions.map(({ item, props: transitionProps, key }) => {
          return item ? (
            <div
              key={key}
              ref={ref}
              style={{
                ...style,
                ...getMarginStyle(placement as any),
                zIndex: 1,
              }}
            >
              <animated.div
                style={transitionProps}
                data-placement={placement}
                {...props}
              >
                {overlay}
              </animated.div>
            </div>
          ) : null;
        })}
      </>
    );
  },
);

type DropdownChildren = (args: {
  open: boolean;
  onToggle: () => void;
  onOpen: () => void;
  onClose: () => void;
  ref: React.Ref<HTMLElement>;
}) => React.ReactNode;

type DropdownOverlay =
  | React.ReactNode
  | ((args: {
      open: boolean;
      onToggle: () => void;
      onOpen: () => void;
      onClose: () => void;
    }) => React.ReactNode);

type DropdownProps = {
  placement?: Popper.Placement;
  overlay: React.ReactNode | DropdownOverlay;
  open?: boolean;
  children: DropdownChildren;
  overflow?: boolean;
  portalTarget?: HTMLElement;
  onOutsideClick?: () => void;
  onOverlayClick?: () => void;
  closeOnOverlayClick?: boolean;
  closeOnOutsideClick?: boolean;
};

const Dropdown = ({
  placement: defaultPlacement = 'bottom-start',
  overlay: overlayProp = null,
  open: openProp,
  children = () => null,
  portalTarget,
  overflow,
  onOutsideClick,
  onOverlayClick,
  closeOnOverlayClick = true,
  closeOnOutsideClick = true,
}: DropdownProps) => {
  const [openState, setOpenState] = React.useState<boolean>(false);

  const { current: isControlled } = React.useRef<boolean>(
    openProp !== undefined,
  );

  const modifiers = React.useMemo(
    () => ({
      ...(overflow ? { preventOverflow: { enabled: false } } : {}),
    }),
    [overflow],
  );

  const open = isControlled ? Boolean(openProp) : openState;

  const childrenProps = {
    open,
    onClose: () => setOpenState(false),
    onOpen: () => setOpenState(true),
    onToggle: () => setOpenState(o => !o),
  };

  const overlay = isFunction(overlayProp)
    ? overlayProp(childrenProps)
    : (overlayProp as React.ReactNode);

  const overlayRef = React.useRef<HTMLDivElement>(null);
  const targetRef = React.useRef<HTMLElement>(null);

  const wrappedOverlay = overlay ? <div ref={overlayRef}>{overlay}</div> : null;

  const handleOutsideClick = React.useCallback(() => {
    if (!isControlled && closeOnOutsideClick) {
      setOpenState(false);
    }

    if (isFunction(onOutsideClick)) {
      onOutsideClick();
    }
  }, [isControlled, onOutsideClick, closeOnOutsideClick]);

  const handleOverlayClick = React.useCallback(() => {
    if (!isControlled && closeOnOverlayClick) {
      setOpenState(false);
    }

    if (isFunction(onOverlayClick)) {
      onOverlayClick();
    }
  }, [isControlled, onOverlayClick, closeOnOverlayClick]);

  const onWindowClick = React.useCallback(
    e => {
      const isTriggerElement =
        targetRef.current &&
        (targetRef.current === e.target ||
          targetRef.current.contains(e.target));

      const isOverlay =
        overlayRef.current &&
        (overlayRef.current === e.target ||
          overlayRef.current.contains(e.target));

      if (isOverlay) {
        return handleOverlayClick();
      }

      if (!isTriggerElement && open) {
        return handleOutsideClick();
      }
    },
    [handleOverlayClick, handleOutsideClick, open],
  );

  const { placement: popperPlacement, style: popperStyle } = usePopper({
    referenceNode: targetRef,
    popperNode: overlayRef,
    modifiers,
    placement: defaultPlacement,
  });

  const content = (
    <DropdownDialog
      overlay={wrappedOverlay}
      open={open}
      placement={popperPlacement}
      style={popperStyle}
      modifiers={modifiers}
      ref={overlayRef}
    />
  );

  return (
    <>
      <EventListener target="window" onClick={onWindowClick} />
      {children({ ref: targetRef, ...childrenProps })}
      {portalTarget ? createPortal(content, portalTarget) : content}
    </>
  );
};

export default Dropdown;
