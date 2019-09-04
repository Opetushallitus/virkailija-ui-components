import * as React from 'react';

import { InputBase } from '../Input';

const TextareaBase = InputBase.withComponent('textarea');

type TextareaBaseProps = {
  error?: boolean;
  disabled?: boolean;
};

export type TextareaProps = TextareaBaseProps &
  Omit<React.ComponentProps<typeof TextareaBase>, keyof TextareaBaseProps>;

const Textarea = ({ rows = 3, error = false, disabled = false, ...props }) => (
  <TextareaBase error={error} disabled={disabled} rows={rows} {...props} />
);

export default Textarea;
