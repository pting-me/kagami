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
import { useCallback } from 'react';

import { AccordionIndicator, DownloadButton } from '@kagami/view-ui';

import createComponent from '../createComponent';

const isComponentSetNode = (node: BaseNode): node is ComponentSetNode => {
  return node.type === 'COMPONENT_SET';
};

function NodeList(props: {
  nodes: BaseNode[];
  type: 'COMPONENT_SET' | 'COMPONENT';
}) {
  const { nodes, type } = props;

  const getComponentFile = useCallback(
    (index: number) => {
      const node = nodes[index];
      if (!node || !isComponentSetNode(node)) {
        return { filename: 'NO_DATA', downloadData: '' };
      }

      const filename = `${upperFirst(camelCase(node.name))}.tsx`;
      const downloadData = createComponent(node);
      return { filename, downloadData };
    },
    [nodes]
  );

  return (
    <Accordion collapsible multiple>
      {nodes.map((node, index) => {
        if (node.type !== type) {
          return null;
        }
        const { filename, downloadData } = getComponentFile(index);
        return (
          <AccordionItem key={node.id}>
            {type === 'COMPONENT_SET' && (
              <>
                {/* TODO: Change to something other than button, for DOM validation */}
                <AccordionButton className="pr-2 h-8 w-full border-brand-hover hover:border-y">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <AccordionIndicator />
                      <div>{node.name}</div>
                    </div>
                    <div>
                      <DownloadButton
                        className="flex h-4 w-4 items-center justify-center bg"
                        aria-label="Download React code"
                        dataBlob={[downloadData]}
                        filename={filename}
                        disabled={!downloadData}
                      >
                        <ArrowDownTrayIcon />
                      </DownloadButton>
                    </div>
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
              <button className="px-4 h-8 flex items-center text-left w-full border-brand-hover hover:border-y">
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
