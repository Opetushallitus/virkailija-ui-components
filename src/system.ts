export {
  space,
  SpaceProps,
  color,
  ColorProps,
  flexbox,
  FlexboxProps,
  layout,
  LayoutProps,
  typography,
  TypographyProps,
  shadow,
  ShadowProps,
} from 'styled-system';

export const disabledStyle = ({
  disabled,
  theme,
}: {
  disabled: boolean;
  theme: any;
}) => disabled && theme.disabled;
