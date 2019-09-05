import * as React from 'react';
import { createPortal } from 'react-dom';
import { Manager, Reference, Popper } from 'react-popper';
import { useTransition, animated } from 'react-spring';
import EventListener from 'react-event-listener';
import memoizeOne from 'memoize-one';

import isFunction from '../utils/isFunction';

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

type PopperProps = React.ComponentProps<typeof Popper>;

type DropdownDialogProps = {
  [x: string]: any;
  overlay: React.ReactNode;
  open: boolean;
  placement: PopperProps['placement'];
};

const DropdownDialog = ({
  overlay,
  open,
  placement: placementProp,
  modifiers = {},
  ...props
}: DropdownDialogProps) => {
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
          <Popper placement={placementProp} modifiers={modifiers} key={key}>
            {({ ref, style, placement }) => {
              return (
                <div
                  ref={ref}
                  style={{ ...style, ...getMarginStyle(placement), zIndex: 1 }}
                >
                  <animated.div
                    style={transitionProps}
                    data-placement={placement}
                    {...props}
                  >
                    {overlay}
                  </animated.div>
                </div>
              );
            }}
          </Popper>
        ) : null;
      })}
    </>
  );
};

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
  placement?: PopperProps['placement'];
  overlay: React.ReactNode | DropdownOverlay;
  open?: boolean;
  children: DropdownChildren;
  overflow?: boolean;
  portalTarget?: HTMLElement;
  onOutsideClick?: () => void;
  onOverlayClick?: () => void;
  toggleOnOverlayClick?: boolean;
  toggleOnOutsideClick?: boolean;
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
  toggleOnOverlayClick = true,
  toggleOnOutsideClick = true,
}: DropdownProps) => {
  const [openState, setOpenState] = React.useState<boolean>(false);
  const { current: isControlled } = React.useRef<boolean>(
    openProp !== undefined,
  );

  const modifiers = {
    ...(overflow && { preventOverflow: { enabled: false } }),
  };

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
  const targetRef = React.useRef<HTMLElement>();
  const wrappedOverlay = overlay ? <div ref={overlayRef}>{overlay}</div> : null;

  const createForwardingRef = React.useRef<any>(null);

  if (!createForwardingRef.current) {
    createForwardingRef.current = memoizeOne((ref: any) => {
      return (node: any) => {
        targetRef.current = node;

        ref(node);
      };
    });
  }

  const childrenFn = React.useCallback(
    ({ ref, ...rest }) => {
      return children({
        ref: createForwardingRef.current(ref),
        ...childrenProps,
        ...rest,
      });
    },
    [children, childrenProps],
  );

  const handleOutsideClick = React.useCallback(() => {
    if (!isControlled && toggleOnOutsideClick) {
      setOpenState(o => !o);
    }

    if (isFunction(onOutsideClick)) {
      onOutsideClick();
    }
  }, [isControlled, onOutsideClick, toggleOnOutsideClick]);

  const handleOverlayClick = React.useCallback(() => {
    if (!isControlled && toggleOnOverlayClick) {
      setOpenState(o => !o);
    }

    if (isFunction(onOverlayClick)) {
      onOverlayClick();
    }
  }, [isControlled, onOverlayClick, toggleOnOverlayClick]);

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

  const content = (
    <DropdownDialog
      overlay={wrappedOverlay}
      open={open}
      placement={defaultPlacement}
      modifiers={modifiers}
    />
  );

  return (
    <>
      <EventListener target="window" onClick={onWindowClick} />
      <Manager>
        <Reference>{childrenFn}</Reference>
        {portalTarget ? createPortal(content, portalTarget) : content}
      </Manager>
    </>
  );
};

export default Dropdown;
