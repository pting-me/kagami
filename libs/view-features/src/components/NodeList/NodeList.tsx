import { ArrowDownTrayIcon } from '@heroicons/react/20/solid';
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
} from '@reach/accordion';
import '@reach/accordion/styles.css';
import { MouseEvent } from 'react';

import {
  DryBaseNode,
  HydratedComponentNode,
  HydratedComponentSetNode,
} from '@kagami/types';
import { AccordionIndicator } from '@kagami/view-ui';

import postMessageToSandbox from '../../pubsub/postMessageToSandbox';

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

  const handleDownloadClick =
    (id: string) => (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      postMessageToSandbox({ type: 'generateCode', payload: { id } });
    };

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
                <div className="pr-2 h-8 w-full border-brand-hover hover:border-y flex items-stretch justify-between">
                  <AccordionButton className="flex-grow">
                    <div className="flex items-center">
                      <AccordionIndicator />
                      <div>{name}</div>
                    </div>
                  </AccordionButton>

                  <button
                    aria-label="Download React code"
                    onClick={handleDownloadClick(id)}
                  >
                    <div className="flex h-4 w-4 mr-2 items-center justify-center bg">
                      <ArrowDownTrayIcon />
                    </div>
                  </button>
                </div>

                {hasChildren<HydratedComponentSetNode, HydratedComponentNode>(
                  node
                ) && (
                  <AccordionPanel>
                    <NodeList nodes={node.children} type="COMPONENT" />
                  </AccordionPanel>
                )}
              </>
            )}
            {isComponent(node) && (
              <button
                className="px-4 h-8 flex items-center text-left w-full border-brand-hover hover:border-y"
                onClick={handleComponentClick(id)}
              >
                <div className="box-border overflow-ellipsis whitespace-nowrap overflow-hidden">
                  {name}
                </div>
              </button>
            )}
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}

export default NodeList;
