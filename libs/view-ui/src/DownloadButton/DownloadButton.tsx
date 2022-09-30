import {
  ComponentPropsWithRef,
  MouseEvent as ReactMouseEvent,
  forwardRef,
} from 'react';

interface FileOptions {
  filename: string;
  data: BlobPart;
  mimeType?: string;
}

/**
 * Adopted from https://stackoverflow.com/questions/19721439/download-json-object-as-a-file-from-browser
 * @param {} options
 */
const saveFile = (options: FileOptions) => {
  const {
    filename,
    data,
    mimeType = typeof data === 'string'
      ? 'text/plain'
      : 'application/octet-stream',
  } = options;
  const blob = new Blob([data], {
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
  link.remove();
};

interface Props extends ComponentPropsWithRef<'button'> {
  filename: string;
  data: string;
  mimeType?: string;
}

const DownloadButton: React.FC<Props> = forwardRef<HTMLButtonElement, Props>(
  (props, ref) => {
    const { filename, data, mimeType, children, ...rest } = props;

    const handleClick = (e: ReactMouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      saveFile({ filename, data, mimeType });
    };

    return (
      <button ref={ref} onClick={handleClick} {...rest}>
        {children}
      </button>
    );
  }
);

export default DownloadButton;
