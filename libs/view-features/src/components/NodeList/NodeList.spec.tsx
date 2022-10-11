import { act, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { mockComponentData } from '../../mock';
import NodeList from './NodeList';

vi.mock('https://unpkg.com/prettier@2.7.1/esm/parser-typescript.mjs', () => {
  return {
    default: vi.fn(),
  };
});

vi.mock('https://unpkg.com/prettier@2.7.1/esm/standalone.mjs', () => {
  return {
    default: {
      format: vi.fn().mockImplementation((file: unknown) => file),
    },
  };
});

describe('NodeList', () => {
  it('renders', () => {
    const { baseElement } = render(<NodeList nodes={[]} type="COMPONENT" />);

    expect(baseElement).toBeInTheDocument();
  });

  describe('with component nodes', () => {
    const { componentNodes } = mockComponentData;
    render(<NodeList nodes={componentNodes} type="COMPONENT" />);

    it.each(componentNodes.map((node) => [node.name]))(
      'should display component name as %s',
      (componentName) => {
        expect(screen.getByText(componentName ?? '')).toBeInTheDocument();
      }
    );
  });

  describe('with component set nodes', () => {
    const { componentSetNodes } = mockComponentData;
    const { rerender } = render(
      <NodeList nodes={componentSetNodes} type="COMPONENT_SET" />
    );

    it.each(componentSetNodes.map((node) => [node.name, node.children]))(
      'should display component name as %s',
      (componentName, childNodes) => {
        const componentInScreen = screen.getByText(componentName ?? '');
        expect(componentInScreen).toBeInTheDocument();

        act(() => {
          componentInScreen.click();
        });
        // might be repeated
        expect(
          screen.getAllByText(childNodes?.[0].name ?? '')[0]
        ).toBeVisible();

        rerender(<NodeList nodes={componentSetNodes} type="COMPONENT_SET" />);
      }
    );
  });
});
