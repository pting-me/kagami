import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
} from '@reach/accordion';
import '@reach/accordion/styles.css';

const MockExpandIcon = () => (
  <div className="w-4 h-4 flex items-center">
    <div className="plus-icon">+</div>
    <div className="minus-icon">&ndash;</div>
  </div>
);

function NodeList(props: {
  nodes: BaseNode[];
  type: 'COMPONENT_SET' | 'COMPONENT';
}) {
  const { nodes, type } = props;

  return (
    <Accordion collapsible multiple>
      {nodes.map((node) => {
        if (node.type !== type) {
          return null;
        }
        return (
          <AccordionItem>
            {type === 'COMPONENT_SET' && (
              <>
                <AccordionButton className="px-4 h-8 w-full hover:bg-hover active:bg-pressed">
                  <div className="flex items-center">
                    <MockExpandIcon />
                    <div>{node.name}</div>
                  </div>
                </AccordionButton>

                <AccordionPanel>
                  <NodeList
                    nodes={node.children as ComponentNode[]}
                    type="COMPONENT"
                  />
                </AccordionPanel>
              </>
            )}
            {type === 'COMPONENT' && (
              <button className="px-4 h-8 flex items-center w-full">
                {node.name}
              </button>
            )}
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}

export default NodeList;
