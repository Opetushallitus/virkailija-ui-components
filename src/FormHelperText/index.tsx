import * as React from 'react';
import styled from 'styled-components';

import { space, SpaceProps } from '../system';

const FormHelperTextBase = styled.div<
  { disabled: boolean; error: boolean } & SpaceProps
>`
  display: block;
  margin-top: ${({ theme }) => theme.space[1]}px;
  ${({ theme }) => theme.typography.secondary};
  ${space};

  ${({ error, theme }) =>
    error && {
      color: theme.colors.danger.main,
    }}
`;

export type FormHelperTextProps = Omit<
  React.ComponentProps<typeof FormHelperTextBase>,
  'disabled' | 'error'
> & {
  disabled?: boolean;
  error?: boolean;
};

const FormHelperText = ({
  error = false,
  disabled = false,
  ...props
}: FormHelperTextProps) => {
  return <FormHelperTextBase error={error} disabled={disabled} {...props} />;
};

export default FormHelperText;
