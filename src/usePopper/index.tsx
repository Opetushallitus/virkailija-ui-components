import * as React from 'react';
import PopperJS from 'popper.js';

const defaultOpts = {
  placement: 'bottom',
  eventsEnabled: true,
  referenceElement: undefined,
  positionFixed: false,
} as const;

const initialStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  opacity: 0,
  pointerEvents: 'none',
} as const;

const initialArrowStyle = {};

const noop = () => {};

const defaultArrowNode = { current: undefined } as const;

interface Options extends PopperJS.PopperOptions {
  referenceNode: React.RefObject<HTMLElement>;
  popperNode: React.RefObject<HTMLElement>;
  arrowNode?: React.RefObject<HTMLElement>;
}

export default function usePopper(inputOpts: Options) {
  const opts = { ...defaultOpts, ...inputOpts };

  const { referenceNode, popperNode, arrowNode = defaultArrowNode } = opts;

  const [state, setState] = React.useState<{
    data: any;
    placement: PopperJS.Placement | undefined;
  }>({
    data: undefined,
    placement: undefined,
  });

  const popperInstance = React.useRef<any>();

  const callbackFn = React.useCallback(data => {
    const { placement } = data;
    setState({ data, placement });
    return data;
  }, []);

  React.useEffect(() => {
    if (popperInstance.current) {
      popperInstance.current.scheduleUpdate();
    }
  }, [state.placement]);

  React.useEffect(/* eslint-disable react-hooks/exhaustive-deps */ () => {
    if (referenceNode.current && popperNode.current) {
      popperInstance.current = new PopperJS(
        referenceNode.current,
        popperNode.current,
        {
          placement: opts.placement,
          eventsEnabled: opts.eventsEnabled,
          positionFixed: opts.positionFixed,
          modifiers: {
            ...opts.modifiers,
            arrow: {
              ...(opts.modifiers && opts.modifiers.arrow),
              enabled: !!arrowNode.current,
              element: arrowNode.current || undefined,
            },
            applyStyle: { enabled: false },
            updateStateModifier: {
              enabled: true,
              order: 900,
              fn: callbackFn,
            },
          },
        },
      );
    }

    return () => {
      if (popperInstance.current) {
        popperInstance.current.destroy();
        popperInstance.current = null;
      }
    };
  }, [
    callbackFn,
    opts.positionFixed,
    opts.placement,
    opts.eventsEnabled,
    arrowNode.current,
    popperNode.current,
    referenceNode.current,
    opts.modifiers,
  ]);

  const style =
    !popperNode.current || !state.data
      ? initialStyle
      : {
          position: state.data.offsets.popper.position,
          ...state.data.styles,
        };

  const arrowStyle =
    !arrowNode || !arrowNode.current || !state.data
      ? initialArrowStyle
      : state.data.arrowStyles;

  return {
    style,
    placement: state.placement,
    outOfBoundaries: state.data && state.data.hide,
    scheduleUpdate: popperInstance
      ? (popperInstance as any).scheduleUpdate
      : noop,
    arrowStyle,
  };
}
