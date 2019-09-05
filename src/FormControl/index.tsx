import * as React from 'react';

import useId from '../useId';
import FormHelperText from '../FormHelperText';
import FormLabel from '../FormLabel';
import isString from '../utils/isString';

type ChildProps = {
  error?: boolean;
  disabled?: boolean;
};

export type FormControlProps = {
  label?: React.ReactElement<{ htmlFor?: string } & ChildProps> | string;
  helperText?: React.ReactElement<ChildProps> | string;
  children:
    | React.ReactElement<
        {
          id: string;
        } & ChildProps
      >
    | React.ReactElement<ChildProps>[];
  id?: string;
  error?: boolean;
  disabled?: boolean;
  forwardId?: boolean;
};

const FormControl = ({
  label: labelProp,
  helperText: formHelperTextProp,
  children: childrenProp,
  error = false,
  disabled = false,
  id: idProp,
  forwardId = true,
}: FormControlProps) => {
  const genId = useId();
  const id = idProp || genId;

  const childProps = { error, disabled };

  const label = React.isValidElement(labelProp) ? (
    React.cloneElement(labelProp, {
      ...(forwardId && { htmlFor: labelProp.props.htmlFor || id }),
      ...childProps,
    })
  ) : isString(labelProp) ? (
    <FormLabel marginBottom={1} {...childProps} htmlFor={id}>
      {labelProp}
    </FormLabel>
  ) : null;

  const formHelperText = React.isValidElement(formHelperTextProp) ? (
    React.cloneElement(formHelperTextProp, childProps)
  ) : isString(formHelperTextProp) ? (
    <FormHelperText marginTop={1} {...childProps}>
      {formHelperTextProp}
    </FormHelperText>
  ) : null;

  let children = null;

  if (React.isValidElement(childrenProp)) {
    children = React.cloneElement(childrenProp, {
      ...(forwardId && { id: childrenProp.props.id || id }),
      ...childProps,
    });
  } else {
    children = React.Children.map(childrenProp, c => {
      return React.isValidElement(c) ? React.cloneElement(c, childProps) : c;
    });
  }

  return (
    <>
      {label}
      {children}
      {formHelperText}
    </>
  );
};

export default FormControl;
