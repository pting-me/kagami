import { render, screen } from '@testing-library/react';

import Button from './Button';

describe('Button', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Button />);

    expect(baseElement).toBeTruthy();
  });

  it('should have button text', () => {
    render(<Button />);

    expect(screen.getByText('Button')).toBeTruthy();
  });
});
