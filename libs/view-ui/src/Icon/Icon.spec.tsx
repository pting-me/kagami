import { render, screen, waitFor } from '@testing-library/react';

import Icon from './Icon';

describe('Icon', () => {
  it('renders', async () => {
    const iconTestId = 'my-icon';
    const iconClassName = 'my-icon';
    render(
      <Icon
        className={iconClassName}
        iconName="arrow-down-tray"
        data-testid={iconTestId}
      />
    );

    expect(screen.getByTestId(iconTestId)).toBeTruthy();
  });

  /**
   * TODO: This test currently gives a false positive
   * Likely something to do with vitest and fake timers
   */
  it.skip('combines className with default', async () => {
    const iconTestId = 'my-icon';
    const iconClassName = 'my-icon';
    render(
      <Icon
        className={iconClassName}
        iconName="arrow-down-tray"
        data-testid={iconTestId}
      />
    );

    // Unabled to assign with `getByTestId<SVGSVGElement>`
    const icon = screen.getByTestId(iconTestId);

    waitFor(() => Object.entries(icon.className).length);
  });
});
