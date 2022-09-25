import { screen, render } from '@testing-library/react';

import App from './app';
/**
 * @vitest-environment jsdom
 */
describe('App', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<App />);

    expect(baseElement).toBeTruthy();
  });

  it('should have a greeting as the title', () => {
    render(<App />);

    expect(screen.getByText(/Welcome figma-plugin-view/i)).toBeTruthy();
  });
});
