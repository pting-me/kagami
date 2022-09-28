import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
} from '@reach/accordion';
import '@reach/accordion/styles.css';

const MockExpandIcon = () => (
  <div
    style={{
      width: '16px',
      height: '16px',
      display: 'flex',
      alignItems: 'center',
    }}
  >
    <div className="plus-icon">+</div>
    <div className="minus-icon">-</div>
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
                <AccordionButton style={{ width: '100%', height: '32px' }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
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
              <button
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  height: '32px',
                  width: '100%',
                }}
              >
                <div style={{ width: '16px' }}></div>
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
