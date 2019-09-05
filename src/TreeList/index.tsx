import React from 'react';
import styled from 'styled-components';

const ChildrenContainer = styled.div`
  padding-left: ${({ theme }) => theme.space[2]}px;
`;

const ItemContainer = styled.div`
  padding-bottom: ${({ theme }) => theme.space[1]}px;
`;

type TreeItem<T> = { children: T[]; key: string; open?: boolean };

type TreeListChildren<T> = (arg: T & { level: number }) => React.ReactNode;

const renderChildren = <T extends TreeItem<T>>({
  children = [],
  level = 0,
  renderItem,
  defaultOpen,
  itemStyle,
  childrenContainerStyle,
}: {
  defaultOpen: boolean;
  renderItem: TreeListChildren<T>;
  children: T[];
  level: number;
  itemStyle: React.CSSProperties;
  childrenContainerStyle: React.CSSProperties;
}) => {
  return children.length > 0 ? (
    <ChildrenContainer style={childrenContainerStyle}>
      {children.map(childProps => {
        const { key, children = [], open = defaultOpen } = childProps;

        return (
          <div key={key}>
            <ItemContainer style={itemStyle}>
              {renderItem({ ...childProps, level: level + 1 })}
            </ItemContainer>

            {open
              ? renderChildren({
                  children,
                  level: level + 1,
                  renderItem,
                  defaultOpen,
                  itemStyle,
                  childrenContainerStyle,
                })
              : null}
          </div>
        );
      })}
    </ChildrenContainer>
  ) : null;
};

export type TreeListProps<T extends TreeItem<T>> = {
  items: T[];
  defaultOpen?: boolean;
  children: TreeListChildren<T>;
  itemStyle?: React.CSSProperties;
  childrenContainerStyle?: React.CSSProperties;
};

export const TreeList = <T extends TreeItem<T>>({
  children: renderItem = () => null,
  items = [],
  defaultOpen = true,
  itemStyle = {},
  childrenContainerStyle = {},
}: TreeListProps<T>) => {
  return (
    <>
      {items.map(childProps => {
        const { children = [], open = defaultOpen, key } = childProps;

        return (
          <div key={key}>
            <ItemContainer style={itemStyle}>
              {renderItem({ ...childProps, level: 0 })}
            </ItemContainer>

            {open
              ? renderChildren<T>({
                  children,
                  level: 0,
                  renderItem,
                  defaultOpen,
                  itemStyle,
                  childrenContainerStyle,
                })
              : null}
          </div>
        );
      })}
    </>
  );
};

export default TreeList;
