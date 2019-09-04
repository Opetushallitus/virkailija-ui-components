import * as React from 'react';
import styled from 'styled-components';

import isFunction from '../utils/isFunction';

type TabsAlignTabs = 'start' | 'center' | 'end';

const mapAlignToJustifyContent = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
} as const;

const Wrapper = styled.div.attrs({ role: 'tablist' })<{
  alignTabs: TabsAlignTabs;
  fullWidth: boolean;
}>`
  display: ${({ fullWidth }) => (fullWidth ? 'flex' : 'inline-flex')};
  justify-content: ${({ alignTabs }) => mapAlignToJustifyContent[alignTabs]};
`;

export type TabsBaseProps = {
  value?: string;
  onChange?: (value: string) => void;
  fullWidth?: boolean;
  alignTabs?: TabsAlignTabs;
  children: React.ReactElement<{
    value?: string;
    active?: boolean;
    onClick?: (args: any) => void;
  }>[];
};

export type TabsProps = Omit<
  React.ComponentProps<typeof Wrapper>,
  keyof TabsBaseProps
> &
  TabsBaseProps;

const Tabs = ({
  value,
  onChange = () => {},
  alignTabs = 'start',
  fullWidth = true,
  ...props
}: TabsProps) => {
  const childrenCount = React.Children.count(props.children);

  const children = React.Children.map(props.children, (child, index) => {
    const active = value !== undefined && child.props.value === value;
    const isLast = index === childrenCount - 1;

    return React.cloneElement(child, {
      active,
      onClick: (args: any) => {
        isFunction(child.props.onClick) && child.props.onClick(args);
        child.props.value && onChange(child.props.value);
      },
    });
  });

  return (
    <Wrapper alignTabs={alignTabs} fullWidth={fullWidth} {...props}>
      {children}
    </Wrapper>
  );
};

export default Tabs;
