import { act, cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import DownloadButton from './DownloadButton';

describe('DownloadButton', () => {
  /**
   * Mocks functionality due to limitations with jsdom
   */
  const createMocks = () => {
    // creating and revoking the created url
    const mockBlobUrl = 'blob:url:hash';
    vi.spyOn(window.URL, 'createObjectURL');
    vi.mocked(window.URL.createObjectURL).mockImplementation(() => {
      return mockBlobUrl;
    });
    vi.spyOn(window.URL, 'revokeObjectURL');
    vi.mocked(window.URL.revokeObjectURL);

    // mocking the click event
    const mockClickEvent = new Event('mockClick');
    // this is used since 'constructor' would be taken literally
    vi.stubGlobal(
      'MouseEvent',
      vi.fn().mockImplementation(() => mockClickEvent)
    );

    // mocking the dispatcher for the event
    vi.spyOn(HTMLAnchorElement.prototype, 'dispatchEvent');
    const mockDispatch = vi
      .mocked(HTMLAnchorElement.prototype.dispatchEvent)
      .mockImplementation(() => true);

    return { mockDispatch, mockClickEvent };
  };

  afterEach(() => {
    vi.clearAllMocks();
    cleanup();
  });

  it('renders', () => {
    const { baseElement } = render(
      <DownloadButton
        dataBlob={['data']}
        filename="file.txt"
        mimeType="text/plain"
      >
        My button
      </DownloadButton>
    );

    expect(baseElement).toBeInTheDocument();
  });

  it('forwards props', () => {
    const buttonClassName = 'my-button';
    render(
      <DownloadButton
        dataBlob={['data']}
        filename="file.txt"
        mimeType="text/plain"
        className={buttonClassName}
      >
        My button
      </DownloadButton>
    );

    const button = screen.getByText('My button');
    expect(button.className).toBe(buttonClassName);
  });

  it('creates url and dispatches click event', () => {
    const { mockDispatch, mockClickEvent } = createMocks();

    render(
      <DownloadButton
        dataBlob={['data']}
        filename="file.txt"
        mimeType="text/plain"
      >
        My button
      </DownloadButton>
    );

    const button = screen.getByText('My button');
    expect(button).toBeInTheDocument();
    expect(vi.mocked(window.URL.createObjectURL)).not.toHaveBeenCalled();
    expect(mockDispatch).not.toHaveBeenCalled();

    act(() => {
      button.click();
    });

    expect(vi.mocked(window.URL.createObjectURL)).toHaveBeenCalledOnce();
    expect(mockDispatch).toHaveBeenCalledWith(mockClickEvent);
    expect(vi.mocked(window.URL.revokeObjectURL)).toHaveBeenCalledOnce();
  });
});
