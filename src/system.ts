export {
  space,
  color,
  flexbox,
  layout,
  typography,
  shadow,
} from 'styled-system';

export type {
  SpaceProps,
  ColorProps,
  FlexboxProps,
  LayoutProps,
  TypographyProps,
  ShadowProps,
} from 'styled-system';

export const disabledStyle = ({
  disabled,
  theme,
}: {
  disabled: boolean;
  theme: any;
}) => disabled && theme.disabled;
