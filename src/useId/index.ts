import * as React from 'react';

import generateId from '../utils/generateId';

const useId = (prefix?: string): string => {
  const { current: id } = React.useRef<string>(generateId(prefix));

  return id;
};

export default useId;
