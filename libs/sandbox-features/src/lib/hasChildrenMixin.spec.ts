import { describe, expect, it } from 'vitest';

import hasChildrenMixin from './hasChildrenMixin';

describe('hasChildrenMixin', () => {
  const mockChildrenMixin = {
    children: [],
  };

  class MockNode {
    constructor() {
      return this;
    }
  }

  Object.assign(MockNode.prototype, mockChildrenMixin);

  it('returns true', () => {
    const mockNode = new MockNode() as BaseNode;
    expect(hasChildrenMixin(mockNode)).toBeTruthy();
  });
});
