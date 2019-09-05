import * as React from 'react';

import generateId from '../utils/generateId';

const useId = (prefix?: string): string => {
  const idRef = React.useRef<string>();

  if (!idRef.current) {
    idRef.current = generateId(prefix);
  }

  return idRef.current;
};

export default useId;
