import { ArrowDownTrayIcon } from '@heroicons/react/20/solid';
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
} from '@reach/accordion';
import '@reach/accordion/styles.css';
import camelCase from 'lodash.camelcase';
import upperFirst from 'lodash.upperfirst';
import { execPath } from 'process';
import { MouseEvent, useCallback, useEffect } from 'react';

import { AccordionIndicator, DownloadButton } from '@kagami/view-ui';

import generateCode from '../../generators/generateCode';
import postMessageToSandbox from '../../pubsub/postMessageToSandbox';

const isComponentSetNode = (node: BaseNode): node is ComponentSetNode => {
  return node.type === 'COMPONENT_SET';
};

function NodeList(props: {
  nodes: BaseNode[];
  type: 'COMPONENT_SET' | 'COMPONENT';
}) {
  const { nodes, type } = props;

  const handleDownloadClick =
    (id: string) => (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      postMessageToSandbox({ type: 'generateCode', payload: { id } });
    };

  const handleComponentClick = (id: string) => () => {
    postMessageToSandbox({ type: 'focusNode', payload: { id } });
  };

  return (
    <Accordion collapsible multiple>
      {nodes.map((node) => {
        if (node.type !== type) {
          return null;
        }

        return (
          <AccordionItem key={node.id}>
            {type === 'COMPONENT_SET' && (
              <>
                <div className="pr-2 h-8 w-full border-brand-hover hover:border-y flex items-stretch justify-between">
                  <AccordionButton className="flex-grow">
                    <div className="flex items-center">
                      <AccordionIndicator />
                      <div>{node.name}</div>
                    </div>
                  </AccordionButton>

                  <button
                    aria-label="Download React code"
                    onClick={handleDownloadClick(node.id)}
                  >
                    <div className="flex h-4 w-4 items-center justify-center bg">
                      <ArrowDownTrayIcon />
                    </div>
                  </button>
                </div>

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
                className="px-4 h-8 flex items-center text-left w-full border-brand-hover hover:border-y"
                onClick={handleComponentClick(node.id)}
              >
                <div className="box-border overflow-ellipsis whitespace-nowrap overflow-hidden">
                  {node.name}
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
