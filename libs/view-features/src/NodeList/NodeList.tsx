import {
  ArrowDownTrayIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from '@heroicons/react/20/solid';
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

import { DownloadButton } from '@hashi/view-ui';

import createComponent from '../createComponent';

const ExpandIcon = () => (
  <div className="w-4 h-4 flex items-center">
    <ChevronRightIcon className="collapsed-icon" />
    <ChevronDownIcon className="open-icon" />
  </div>
);

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
          <AccordionItem>
            {type === 'COMPONENT_SET' && (
              <>
                <AccordionButton className="pr-2 h-8 w-full border-brand-hover hover:border-y">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <ExpandIcon />
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

                <AccordionPanel className="pl-4">
                  <NodeList
                    nodes={node.children as ComponentNode[]}
                    type="COMPONENT"
                  />
                </AccordionPanel>
              </>
            )}
            {type === 'COMPONENT' && (
              <button className="px-4 h-8 flex items-center text-left w-full box-border overflow-ellipsis">
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
