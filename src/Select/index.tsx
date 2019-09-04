import * as React from 'react';
import { Props } from 'react-select/src/Select';
import ReactSelect from 'react-select';
import { ThemeContext } from 'styled-components';

import { getStyles, getTheme } from './utils';

export { getStyles, getTheme } from './utils';

export interface SelectProps extends Props {
  errror?: boolean;
}

const Select = ({ error = false, ...props }: SelectProps) => {
  const theme = React.useContext(ThemeContext);
  const selectTheme = getTheme(theme);
  const selectStyles = getStyles(theme, error);

  return <ReactSelect theme={selectTheme} styles={selectStyles} {...props} />;
};

export default Select;
