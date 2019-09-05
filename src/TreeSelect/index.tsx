import * as React from 'react';
import intersection from 'lodash/intersection';
import without from 'lodash/without';
import uniq from 'lodash/uniq';

import TreeList from '../TreeList';
import Checkbox from '../Checkbox';
import findTreeNode from '../utils/findTreeNode';
import isObject from '../utils/isObject';

export type TreeSelectProps<T> = {
  options: T[];
  value: string[];
  error?: boolean;
  getLabel?: (node: T) => React.ReactNode;
  getValue?: (node: T) => string;
  getChildren?: (node: T) => T[];
  getIsDisabled?: (node: T) => boolean;
  onChange?: (value: string[]) => void;
};

const defaultGetLabel = <T extends {}>(node: T): React.ReactNode => {
  if (isObject(node)) {
    return (node as any).label;
  }

  return null;
};

const defaultGetValue = <T extends {}>(node: T): string => {
  if (isObject(node)) {
    return (node as any).value || '';
  }

  return '';
};

const defaultGetChildren = <T extends {}>(node: T): T[] => {
  if (isObject(node)) {
    return (node as any).children || [];
  }

  return [];
};

const defaultGetIsDisabled = <T extends {}>(node: T): boolean => {
  if (isObject(node)) {
    return Boolean((node as any).disabled);
  }

  return false;
};

type TreeNode = {
  label: React.ReactNode;
  disabled: boolean;
  value: string;
  children: TreeNode[];
  checked: boolean;
  key: string;
  indeterminate: boolean;
  parent: TreeNode | null;
};

const getTree = <T extends {}>({
  options,
  value,
  getChildren,
  getValue,
  getLabel,
  getIsDisabled,
  parent = null,
}: {
  options: T[];
  value: string[];
  getChildren: (node: T) => T[];
  getValue: (node: T) => string;
  getLabel: (node: T) => React.ReactNode;
  getIsDisabled: (node: T) => boolean;
  parent: TreeNode | null;
}): TreeNode[] => {
  return options.map(opt => {
    const val = getValue(opt);
    const label = getLabel(opt);
    const children = getChildren(opt) || [];
    const disabled = getIsDisabled(opt);

    const node = {
      key: val,
      value: val,
      label,
      disabled,
      checked: value.includes(val),
      indeterminate: !!children.find(child => value.includes(getValue(child))),
      parent,
      children: [],
    };

    // @ts-ignore
    node.children = getTree({
      options: children,
      value,
      getChildren,
      getValue,
      getLabel,
      getIsDisabled,
      parent: node,
    });

    return node;
  });
};

const getAllOptionValues = (options: any): string[] => {
  return options.reduce((acc: any, curr: any) => {
    return [...acc, curr.value, ...getAllOptionValues(curr.children)];
  }, []);
};

const getCleanValue = (
  value: string[],
  allOptionValues: string[],
): string[] => {
  return intersection(allOptionValues, value);
};

const getDeepChildrenValues = (node: any): string[] => {
  return node.children.reduce((acc: any, curr: any) => {
    return [
      ...acc,
      ...(curr.disabled ? [] : [curr.value]),
      ...curr.children
        .filter(({ disabled }: any) => !disabled)
        .reduce(
          (accChild: any, currChild: any) => [
            ...accChild,
            currChild.value,
            ...getDeepChildrenValues(currChild),
          ],
          [],
        ),
    ];
  }, []);
};

const getValueWithCheckedParents = (node: any, value: string[]): string[] => {
  let parent = node.parent;

  let accValue = [...value];

  const isChecked = ({ value: val }: any) => accValue.includes(val);

  while (parent) {
    const next = parent;

    if (!next.disabled) {
      accValue = next.children.every(isChecked)
        ? [...accValue, next.value]
        : accValue;
    }

    parent = next.parent;
  }

  return accValue;
};

const getValueWithUncheckedParents = (node: any, value: string[]): string[] => {
  let parent = node.parent;

  let accValue = [...value];

  while (parent) {
    const next = parent;

    if (!next.disabled) {
      accValue = without(accValue, next.value);
    }

    parent = next.parent;
  }

  return accValue;
};

const makeOnOptionChange = ({
  options,
  value,
  onChange,
  optionValue,
}: {
  options: TreeNode[];
  value: string[];
  optionValue: string;
  onChange: (value: string[]) => void;
}) => (e: React.ChangeEvent<HTMLInputElement>) => {
  const { checked } = e.target;

  const node = findTreeNode(options, ({ value: val }) => val === optionValue);

  let nextValue = value;

  if (!node) {
    return;
  }

  nextValue = uniq(
    checked
      ? [...value, ...getDeepChildrenValues(node), node.value]
      : without(value, ...[...getDeepChildrenValues(node), node.value]),
  );

  nextValue = uniq(getValueWithCheckedParents(node, nextValue));

  if (!checked) {
    nextValue = getValueWithUncheckedParents(node, nextValue);
  }

  return onChange(nextValue);
};

const TreeSelect = <T extends {}>({
  getLabel = defaultGetLabel,
  getValue = defaultGetValue,
  getChildren = defaultGetChildren,
  getIsDisabled = defaultGetIsDisabled,
  options = [],
  value: valueProp = [],
  onChange: onChangeProp = () => {},
  error = false,
}: TreeSelectProps<T>) => {
  const value = valueProp || [];

  const tree = React.useMemo(
    () =>
      getTree({
        options,
        value,
        getChildren,
        getValue,
        getLabel,
        getIsDisabled,
        parent: null,
      }),
    [options, value, getChildren, getValue, getLabel, getIsDisabled],
  );

  const allOptionValues = React.useMemo(() => {
    return getAllOptionValues(tree);
  }, [tree]);

  const onChange = React.useCallback(
    nextValue => {
      onChangeProp(getCleanValue(nextValue, allOptionValues));
    },
    [allOptionValues, onChangeProp],
  );

  const renderItem = React.useCallback(
    ({ label, checked, value: optionValue, indeterminate, disabled }) => {
      return (
        <Checkbox
          checked={checked}
          name={optionValue}
          onChange={makeOnOptionChange({
            options: tree,
            value,
            onChange,
            optionValue,
          })}
          error={error}
          indeterminate={indeterminate}
          disabled={disabled}
        >
          {label}
        </Checkbox>
      );
    },
    [onChange, tree, value, error],
  );

  return <TreeList items={tree}>{renderItem}</TreeList>;
};

export default TreeSelect;
