import {
  ComponentPropsWithRef,
  forwardRef,
  MouseEvent as ReactMouseEvent,
} from 'react';

/**
 * Adopted from https://stackoverflow.com/questions/19721439/download-json-object-as-a-file-from-browser
 * @param filename
 * @param dataObjToWrite
 */
const saveTemplateAsFile = (filename: string, dataObjToWrite: string) => {
  const blob = new Blob([dataObjToWrite], {
    type: 'text/plain',
  });
  const link = document.createElement('a');

  link.download = filename;
  link.href = window.URL.createObjectURL(blob);
  link.dataset['downloadurl'] = ['text/plain', link.download, link.href].join(
    ':'
  );

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
}

const DownloadButton: React.FC<Props> = forwardRef<HTMLButtonElement, Props>(
  (props, ref) => {
    const { filename, data, children, ...rest } = props;

    const handleClick = (e: ReactMouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      saveTemplateAsFile(filename, data);
    };

    return (
      <button ref={ref} onClick={handleClick} {...rest}>
        {children}
      </button>
    );
  }
);

export default DownloadButton;
