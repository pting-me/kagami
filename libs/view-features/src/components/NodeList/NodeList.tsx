import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
} from '@reach/accordion';
import '@reach/accordion/styles.css';

import {
  DryBaseNode,
  HydratedComponentNode,
  HydratedComponentSetNode,
} from '@kagami/types';
import { AccordionIndicator } from '@kagami/view-ui';

import postMessageToSandbox from '../../pubsub/postMessageToSandbox';
import DownloadForm from '../DownloadForm';

type NodeWithChildren<N = DryBaseNode, C = DryBaseNode> = N & {
  children: C[];
};

const hasChildren = <N, C>(node: N): node is NodeWithChildren<N, C> => {
  return Object.prototype.hasOwnProperty.call(node, 'children');
};

const isComponent = (node: DryBaseNode): node is HydratedComponentNode =>
  node.type === 'COMPONENT';
const isComponentSet = (node: DryBaseNode): node is HydratedComponentSetNode =>
  node.type === 'COMPONENT_SET';

function NodeList(props: {
  nodes: DryBaseNode[];
  type: 'COMPONENT_SET' | 'COMPONENT';
}) {
  const { nodes, type: specifiedType } = props;

  const handleComponentClick = (id: string) => () => {
    postMessageToSandbox({ type: 'focusNode', payload: { id } });
  };

  if (nodes.length === 0) {
    return null;
  }

  return (
    <Accordion collapsible multiple>
      {nodes.map((node) => {
        const { type, id, name = 'Unknown component' } = node;

        if (type !== specifiedType) {
          return null;
        }

        return (
          <AccordionItem key={id}>
            {isComponentSet(node) && (
              <>
                <div className="h-8 w-full flex items-stretch justify-between">
                  <AccordionButton className="border border-transparent hover:border-border-component-hover hover:bg-bg-hover flex-grow pr-2">
                    <div className="flex items-center">
                      <div className="p-0.5">
                        <AccordionIndicator
                          className="w-3 h-3"
                          svgClassName="fill-icon-component"
                        />
                      </div>
                      <h2 className="font-bold text-text-component">{name}</h2>
                    </div>
                  </AccordionButton>
                </div>

                <AccordionPanel className="bg-bg-secondary">
                  <DownloadForm id={id} />
                  {hasChildren<HydratedComponentSetNode, HydratedComponentNode>(
                    node
                  ) && (
                    <>
                      <div className="p-4">
                        <h2 className="font-bold pb-4">Component variants</h2>
                        <div>
                          The following component variants will be included in
                          your download.
                        </div>
                      </div>
                      <NodeList nodes={node.children} type="COMPONENT" />
                    </>
                  )}
                </AccordionPanel>
              </>
            )}
            {isComponent(node) && (
              <button
                className="px-4 h-8 flex items-center text-left w-full hover:bg-bg-hover border border-transparent hover:border-border-component-hover"
                onClick={handleComponentClick(id)}
              >
                <h2 className="box-border overflow-ellipsis whitespace-nowrap overflow-hidden text-text-component">
                  {name}
                </h2>
              </button>
            )}
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}

export default NodeList;
