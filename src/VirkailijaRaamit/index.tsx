import * as React from 'react';

import generateId from '../utils/generateId';

const raamitId = generateId('virkailijaRaamit');

export type VirkailijaRaamitProps = {
  scriptUrl: string;
};

const VirkalijaRaamit = ({ scriptUrl }: VirkailijaRaamitProps) => {
  React.useEffect(() => {
    const showRaamit = !!scriptUrl;

    let scriptElement: HTMLScriptElement;

    if (showRaamit && !document.getElementById(raamitId)) {
      scriptElement = document.createElement('script');
      scriptElement.src = scriptUrl;
      scriptElement.id = raamitId;

      document.body.appendChild(scriptElement);
    }

    return () => {
      scriptElement && document.body.removeChild(scriptElement);
    };
  }, [scriptUrl]);

  return null;
};

export default VirkalijaRaamit;
