import { hasChildrenMixin } from './utils';

describe('sandbox-features/utils', () => {
  describe('hasChildrenMixin', () => {
    const mockChildrenMixin = {
      children: [],
    };

    class MockNode {
      constructor() {
        /* do nothing */
      }
    }

    Object.assign(MockNode.prototype, mockChildrenMixin);

    it('returns true', () => {
      const mockNode = new MockNode() as BaseNode;
      expect(hasChildrenMixin(mockNode)).toBeTruthy();
    });
  });
});
