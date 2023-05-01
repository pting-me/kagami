import clsx from "clsx";

import { Disclosure } from "@headlessui/react";
import { HydratedComponentNode } from "@kagami/common";

import { useSelectedNode } from "../../nodes/useSelectedNode";
import { CaretIcon } from "../Icon/CaretIcon";

interface SingleComponentItemProps {
  node: HydratedComponentNode;
}

export function SingleComponentItem(props: SingleComponentItemProps) {
  const { node } = props;
  const [selectedNodeId, setSelectedNodeId] = useSelectedNode();
  return (
    <Disclosure>
      <div
        className={clsx(
          selectedNodeId === node.id && "bg-fill-selected",
          "single-row hover:bg-fill-selected-hover flex w-full"
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
          <div className="text-type-component overflow-hidden text-ellipsis whitespace-nowrap font-bold">
            {node.name}
          </div>
        </div>
      </div>
      <Disclosure.Panel
        className={clsx(
          selectedNodeId === node.id && "bg-fill-selected-secondary",
          "p-4"
        )}
      >
        Download form
      </Disclosure.Panel>
    </Disclosure>
  );
}
