import { ComponentPropsWithRef, forwardRef } from 'react';

/**
 * Adopted from https://stackoverflow.com/questions/19721439/download-json-object-as-a-file-from-browser
 * @param filename
 * @param dataObjToWrite
 */
const saveTemplateAsFile = (filename: string, dataObjToWrite: unknown) => {
  const blob = new Blob([JSON.stringify(dataObjToWrite)], {
    type: 'text/json',
  });
  const link = document.createElement('a');

  link.download = filename;
  link.href = window.URL.createObjectURL(blob);
  link.dataset['downloadurl'] = ['text/json', link.download, link.href].join(
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
  data: unknown;
}

const DownloadButton: React.FC<Props> = forwardRef<HTMLButtonElement, Props>(
  (props, ref) => {
    const { filename, data, children, ...rest } = props;
    console.log(rest);

    const handleClick = () => {
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
