import isArray from './isArray';
import isFunction from './isFunction';
import isObject from './isObject';

const resolveChildren = <T>(node: T, getChildren: any): T[] => {
  if (isFunction(getChildren)) {
    return getChildren(node) || [];
  }

  if (isObject(node)) {
    return (node as any).children || [];
  }

  return [];
};

type FindFn<T> = (arg: T) => boolean;

type Options<T> = {
  getChildren?: (node: T) => T[];
};

const findTreeNode = <T>(
  tree: T[],
  findFn: FindFn<T>,
  options: Options<T> = {},
): T | undefined => {
  const { getChildren } = options;
  const treeArr = isArray(tree) ? tree : [];

  for (const node of treeArr) {
    if (findFn(node)) {
      return node;
    }

    const foundNode = findTreeNode(
      resolveChildren(node, getChildren),
      findFn,
      options,
    );

    if (foundNode) {
      return foundNode;
    }
  }

  return undefined;
};

export default findTreeNode;
