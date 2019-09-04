import React, { useMemo, useCallback } from 'react';
import styled from 'styled-components';

import Select from '../Select';
import Button from '../Button';
import Icon from '../Icon';
import Typography from '../Typography';
import Box from '../Box';

const SelectWrapper = styled.div`
  width: 6rem;
`;

const PageCount = styled(Typography)`
  white-space: nowrap;
`;

export type PaginationProps = {
  value: number;
  disabled?: boolean;
  onChange?: (page: number) => void;
  pageCount: number;
  previousButtonText?: React.ReactNode;
  nextButtonText?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

const getPageOptions = (pageCount: number) =>
  [...new Array(pageCount)].map((v, index) => ({
    value: `${index + 1}`,
    label: `${index + 1}`,
  }));

const Pagination = ({
  value = 1,
  onChange = () => {},
  pageCount = 0,
  disabled = false,
  previousButtonText,
  nextButtonText,
  className,
  style,
}: PaginationProps) => {
  const options = useMemo(() => getPageOptions(pageCount), [pageCount]);
  const onPrev = useCallback(() => onChange(value - 1), [value, onChange]);
  const onNext = useCallback(() => onChange(value + 1), [value, onChange]);

  const onSelectChange = useCallback(({ value }) => onChange(parseInt(value)), [
    onChange,
  ]);

  const pageValue = options[value];

  return (
    <Box
      display="inline-flex"
      alignItems="center"
      className={className}
      style={style}
    >
      <Button
        disabled={value === 1 || disabled}
        onClick={onPrev}
        variant="text"
      >
        <Icon fontSize="1.25rem" mr={1} type="arrow_back" />
        {previousButtonText}
      </Button>
      <Box ml={2} flexGrow={2} flexBasis="10rem">
        <SelectWrapper>
          <Select
            options={options}
            value={pageValue}
            menuPlacement="auto"
            onChange={onSelectChange}
            isDisabled={disabled}
          />
        </SelectWrapper>
      </Box>
      <Box ml={1} mr={2}>
        <PageCount>/ {pageCount}</PageCount>
      </Box>
      <Button
        disabled={pageCount === 0 || value === pageCount || disabled}
        onClick={onNext}
        variant="text"
      >
        {nextButtonText}
        <Icon fontSize="1.25rem" ml={1} type="arrow_forward" />
      </Button>
    </Box>
  );
};

export default Pagination;
