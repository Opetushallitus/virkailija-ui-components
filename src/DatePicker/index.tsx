import 'react-day-picker/lib/style.css';

import * as React from 'react';
import DayPicker from 'react-day-picker';

import DatePickerStyle from '../DatePickerStyle';

type DayPickerProps = React.ComponentProps<typeof DayPicker>;

export type DatePickerProps = DayPickerProps & {
  value?: DayPickerProps['selectedDays'];
  className?: string;
};

export const DatePicker = ({
  value,
  className = '',
  ...props
}: DatePickerProps) => (
  <>
    <DatePickerStyle />
    <DayPicker
      className={`DatePicker__ ${className}`}
      selectedDays={value}
      {...props}
    />
  </>
);

export default DatePicker;
