import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
} from '@reach/accordion';
import { cleanup, render, screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { afterEach, describe, expect, it } from 'vitest';

import AccordionIndicator from './AccordionIndicator';

describe('AccordionIndicator', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders', () => {
    const { baseElement } = render(<AccordionIndicator />);

    expect(baseElement).toBeTruthy();
  });

  it('displays correct icon inside Accordion', async () => {
    render(
      <Accordion collapsible multiple>
        <AccordionItem>
          <AccordionButton>Button</AccordionButton>
          <AccordionPanel>Content</AccordionPanel>
          <AccordionIndicator />
        </AccordionItem>
      </Accordion>
    );
    const openIndicator = screen.getByLabelText('Open');
    const collapsedIndicator = screen.getByLabelText('Collapsed');
    const content = screen.getByText('Content');

    // sanity check for content
    expect(content).not.toBeVisible();

    // actually checking indicator
    expect(collapsedIndicator).toBeVisible();
    expect(openIndicator).not.toBeVisible();

    act(() => {
      const button = screen.getByText('Button');
      button.click();
    });

    // sanity check for content
    await waitFor(() => expect(content).toBeVisible());

    // actually checking indicator
    await waitFor(() => expect(collapsedIndicator).not.toBeVisible());
  });
});
