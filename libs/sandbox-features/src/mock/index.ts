import rawComponentData from './context.json';

const mockComponentData = rawComponentData as unknown as {
  components: ComponentNode[];
  componentSetNodes: ComponentSetNode[];
};

export { mockComponentData };
