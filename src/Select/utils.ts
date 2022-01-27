import {DefaultTheme} from 'styled-components';
import {setLightness} from 'polished';
import memoizeOne from 'memoize-one';

export const getStyles = memoizeOne((theme: DefaultTheme, error: boolean) => ({
  container: (provided: any) => ({
    ...provided,
    fontFamily: theme.fonts.main,
  }),
  menuPortal: (provided: any) => {
    return {
      ...provided,
      fontFamily: theme.fonts.main,
      zIndex: 9999,
    };
  },
  menu: (provided: any) => ({
    ...provided,
    zIndex: 3,
  }),
  control: (provided: any, state: any) => {
    const isFocused = !!state.isFocused;

    return {
      ...provided,
      boxShadow: '0 0 0 0 transparent',
      borderColor: error ? theme.colors.danger.main : theme.colors.inputBorder,
      transition: 'border-color 0.25s, box-shadow 0.25s',
      borderRadius: `${theme.radii[1]}px`,
      '&:hover': {
        borderColor: error
          ? theme.colors.danger.main
          : theme.colors.primary.main,
      },
      ...(isFocused && {
        boxShadow: `0 0 0 3px ${
          error
            ? theme.colors.danger.focusOutline
            : theme.colors.primary.focusOutline
        }`,
        borderColor: error
          ? theme.colors.danger.main
          : theme.colors.primary.main,
      }),
    };
  },
  option: (provided: any, state: any) => ({
    ...provided,
    color: state.isSelected
      ? 'white'
      : state.isDisabled
      ? 'lightgray'
      : theme.colors.text.primary,
    cursor: state.isDisabled ? 'not-allowed' : provided.cursor,
  }),
  singleValue: (provided: any, state: any) => {
    const opacity = state.isDisabled ? 0.5 : 1;

    return { ...provided, opacity, color: theme.colors.text.primary };
  },
}));

export const getTheme = memoizeOne((theme: DefaultTheme) => {
  const {
    colors: {
      primary: { main: primaryMain },
    },
  } = theme;

  const primary25 = setLightness(0.9, primaryMain);
  const primary50 = setLightness(0.8, primaryMain);

  return (selectTheme: any) => ({
    ...selectTheme,
    colors: {
      ...selectTheme.colors,
      primary: primaryMain,
      primary25,
      primary50,
    },
  });
});
