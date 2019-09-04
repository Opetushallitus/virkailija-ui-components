import 'react-day-picker/lib/style.css';

import { createGlobalStyle } from 'styled-components';

const DatePickerStyle = createGlobalStyle`
  .DatePicker__ {
    .DayPicker-Caption {
      color: ${({ theme }) => (theme as any).colors.text.primary} !important;
    }

    .DayPicker-wrapper {
      font-family: ${({ theme }) => (theme as any).fonts.main};
    }

    .DayPicker-Day {
      color: ${({ theme }) => (theme as any).colors.text.primary};

      &:not(.DayPicker-Day--outside):not(.DayPicker-Day--selected) {
        &:hover {
          background-color: rgba(0, 0, 0, .05) !important;
        }
      }
    }
    
    .DayPicker-Day--today {
      color: ${({ theme }) => (theme as any).colors.primary.main};
      font-weight: normal !important;
    }

    .DayPicker-Day--selected:not(.DayPicker-Day--outside) {
      background-color: ${({ theme }) =>
        (theme as any).colors.primary.main} !important;
      font-weight: ${({ theme }) => (theme as any).fontWeights.bold} !important;
    }

    .DayPicker-Weekday {
      color: ${({ theme }) => (theme as any).colors.text.secondary} !important;
    }
  }

  .DatePickerOverlay__ {
    border: 1px solid ${({ theme }) => (theme as any).colors.divider};
    border-radius: ${({ theme }) => (theme as any).radii[1]}px;
    box-shadow: ${({ theme }) => (theme as any).shadows.dropdownMenu};
    background-color: white;
  }

  .DatePickerOverlayWrapper__ {
    display: inline-block !important;
    transform: translateY(${({ theme }) => (theme as any).space[1]}px);
    position: absolute;
    z-index: ${({ theme }) => (theme as any).zIndices.datePicker};
  }
`;

export default DatePickerStyle;
