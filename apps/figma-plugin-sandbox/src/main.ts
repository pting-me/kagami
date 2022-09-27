import { postMessageToView } from '@hashi/sandbox-features';

const nodes = figma.root.findAllWithCriteria({
  types: ['COMPONENT', 'COMPONENT_SET'],
});


console.log(nodes);

figma.showUI(__html__, { themeColors: true, width: 1024, height: 576 });
postMessageToView('blah');
