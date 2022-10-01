import {
  ComponentPropsWithRef,
  MouseEvent as ReactMouseEvent,
  forwardRef,
} from 'react';

interface FileOptions {
  filename: string;
  dataBlob: BlobPart[];
  mimeType?: string;
}

const isPlainText = (dataBlob: BlobPart[]): dataBlob is string[] => {
  return dataBlob.reduce(
    (isPlainText, blobPart) => isPlainText && typeof blobPart === 'string',
    true
  );
};

/**
 * Adopted from https://stackoverflow.com/questions/19721439/download-json-object-as-a-file-from-browser
 * @param {} options
 */
const downloadFile = (options: FileOptions) => {
  const {
    filename,
    dataBlob,
    mimeType = isPlainText(dataBlob)
      ? 'text/plain'
      : 'application/octet-stream',
  } = options;
  const blob = new Blob(dataBlob, {
    type: mimeType,
  });
  const link = document.createElement('a');

  link.download = filename;
  link.href = window.URL.createObjectURL(blob);

  link.dataset['downloadurl'] = [mimeType, link.download, link.href].join(':');

  const evt = new MouseEvent('click', {
    view: window,
    bubbles: true,
    cancelable: true,
  });

  link.dispatchEvent(evt);
  window.URL.revokeObjectURL(link.href);
  link.remove();
};

interface Props extends ComponentPropsWithRef<'button'> {
  filename: string;
  dataBlob: BlobPart[];
  mimeType?: string;
}

const DownloadButton = forwardRef<HTMLButtonElement, Props>((props, ref) => {
  const { filename, dataBlob, mimeType, children, ...rest } = props;

  const handleClick = (e: ReactMouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    downloadFile({ filename, dataBlob, mimeType });
  };

  return (
    <button onClick={handleClick} ref={ref} {...rest}>
      {children}
    </button>
  );
});

export default DownloadButton;
export { Props as DownloadButtonProps };
