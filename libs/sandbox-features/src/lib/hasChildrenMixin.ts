/**
 * Narrowing function for nodes with children
 * Only to be used in the sandbox with all the mixin functionality
 * @param {BaseNode} node
 * @returns {boolean}
 */
const hasChildrenMixin = (node: BaseNode): node is BaseNode & ChildrenMixin => {
  // Note that we can't use `hasOwnProperty` to detect mixins
  // We're not worried about type coercion here since we're just checking properties
  if (
    !Object.keys(Object.getPrototypeOf(node) as BaseNode).includes('children')
  ) {
    return false;
  }
  return true;
};

export default hasChildrenMixin;
