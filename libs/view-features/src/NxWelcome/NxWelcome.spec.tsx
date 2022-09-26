import { screen, render } from '@testing-library/react';

import NxWelcome from './NxWelcome';

describe('App', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<NxWelcome title="" />);

    expect(baseElement).toBeTruthy();
  });

  it('should have a greeting as the title', () => {
    render(<NxWelcome title="figma-plugin-view" />);

    expect(screen.getByText(/Welcome figma-plugin-view/i)).toBeTruthy();
  });
});
