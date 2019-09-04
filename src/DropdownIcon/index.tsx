import * as React from 'react';
import Icon, { IconProps } from '../Icon';
import { useSpring, animated } from 'react-spring';

type DropdownIconProps = Omit<IconProps, 'type'> & {
  open?: boolean;
  icon?: string;
};

export const DropdownIcon = ({
  open = false,
  icon = 'arrow_drop_down',
  ...props
}: DropdownIconProps) => {
  const spring = useSpring({
    transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
    display: 'inline-flex',
  });

  return (
    <animated.span style={spring}>
      <Icon type={icon} {...props} />
    </animated.span>
  );
};

export default DropdownIcon;
