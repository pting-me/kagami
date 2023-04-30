import clsx from "clsx";

import { Disclosure } from "@headlessui/react";
import {
  HydratedComponentNode,
  HydratedComponentSetNode,
} from "@kagami/common";

import { useSelectedNode } from "../../nodes/useSelectedNode";
import { ComponentItem } from "../ComponentItem/ComponentItem";
import { CaretIcon } from "../Icon/CaretIcon";

interface ComponentSetItemProps {
  node: HydratedComponentSetNode;
}

export function ComponentSetItem(props: ComponentSetItemProps) {
  const { node } = props;

  const [selectedNodeId, setSelectedNodeId] = useSelectedNode();
  return (
    <Disclosure>
      <div
        className={clsx(
          selectedNodeId === node.id && "bg-fill-selected",
          "single-row text-type-component hover:border-stroke-component flex w-full border border-transparent font-bold"
        )}
      >
        <Disclosure.Button className="fill-icon-tertiary flex h-full items-center">
          <div className="pl-4 pr-2">
            <CaretIcon />
          </div>
        </Disclosure.Button>
        <div
          onClick={() => {
            setSelectedNodeId(node.id);
          }}
          className="flex h-full w-full items-center overflow-hidden pr-4"
        >
          <div className="overflow-hidden text-ellipsis whitespace-nowrap">
            {node.name}
          </div>
        </div>
      </div>
      <Disclosure.Panel
        className={clsx(
          selectedNodeId === node.id && "bg-fill-selected-secondary"
        )}
      >
        {node.children.map((childNode: HydratedComponentNode) => {
          return (
            <ComponentItem
              onClick={() => {
                setSelectedNodeId(childNode.id);
              }}
              className={clsx(
                selectedNodeId === node.id && "bg-fill-selected-secondary",
                selectedNodeId === childNode.id && "bg-fill-selected"
              )}
              key={childNode.id}
              node={childNode}
            />
          );
        })}
      </Disclosure.Panel>
    </Disclosure>
  );
}
