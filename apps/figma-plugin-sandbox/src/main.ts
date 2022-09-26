import { publisher } from '@hashi/sandbox-features';

console.log(publisher(null));

const nodes = figma.root.findAllWithCriteria({
  types: ['COMPONENT', 'COMPONENT_SET'],
});

console.log(nodes);

figma.showUI(__html__, { themeColors: true, width: 1024, height: 576 });
