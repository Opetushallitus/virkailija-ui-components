import * as React from 'react';
import styled from 'styled-components';

import {
  color,
  ColorProps,
  space,
  SpaceProps,
  typography,
  TypographyProps,
} from '../system';

type SystemProps = ColorProps & SpaceProps & TypographyProps;

const IconBase = styled.span<SystemProps>`
  font-size: 1.5rem;
  ${color};
  ${space};
  ${typography};
`;

export type IconProps = React.ComponentProps<typeof IconBase> & {
  type: string;
};

const Icon = React.forwardRef<HTMLSpanElement, IconProps>(
  ({ type, className = '', ...props }, ref) => {
    const iconClassName = `material-icons ${className}`;

    return (
      <IconBase ref={ref} className={iconClassName} {...props}>
        {type}
      </IconBase>
    );
  },
);

export default Icon;
