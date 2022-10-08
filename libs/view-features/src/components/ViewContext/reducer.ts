import { MessageFromSandbox } from '@kagami/types';

import { ContextState } from './ViewContext';
import downloadFile from './downloadFile';
import formatWithPrettier from './formatWithPrettier';

const reducer = (
  state: ContextState,
  action: MessageFromSandbox
): ContextState => {
  const { type, payload } = action;
  switch (type) {
    case 'setComponentNodes':
      return { ...state, componentNodes: payload };
    case 'setComponentSetNodes':
      return { ...state, componentSetNodes: payload };
    case 'setDownloadInfo': {
      const { payload: downloadInfo } = action;
      const newState = { ...state, downloadInfo };
      const { content, download, filename } = downloadInfo;

      if (!download) {
        return newState;
      }

      downloadFile({
        filename,
        dataBlob: [formatWithPrettier(content)],
      });
      return newState;
    }
    default:
      return state;
  }
};

export default reducer;
