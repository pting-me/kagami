import { ContextAction, ContextState } from './ViewContext';
import downloadFile from './downloadFile';
import formatWithPrettier from './formatWithPrettier';

const reducer = (state: ContextState, action: ContextAction) => {
  switch (action.type) {
    case 'setComponentNodes':
      return { ...state, componentNodes: action.payload };
    case 'setComponentSetNodes':
      return { ...state, componentSetNodes: action.payload };
    case 'setFileInfo': {
      const { payload: fileInfo } = action;
      const newState = { ...state, fileInfo };
      const { content, download, filename } = fileInfo;

      if (!download) {
        return newState;
      }

      downloadFile({
        filename,
        dataBlob: [formatWithPrettier(content as string)],
      });
      return newState;
    }
    default:
      return state;
  }
};

export default reducer;
