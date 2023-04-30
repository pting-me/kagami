import { Disclosure } from "@headlessui/react";
import {
  HydratedComponentNode,
  HydratedComponentSetNode,
} from "@kagami/common";

import { ComponentItem } from "../ComponentItem/ComponentItem";
import { CaretIcon } from "../Icon/CaretIcon";

interface ComponentSetItemProps {
  node: HydratedComponentSetNode;
}

export function ComponentSetItem(props: ComponentSetItemProps) {
  const { node } = props;
  return (
    <Disclosure>
      <div className="single-row text-type-component hover:border-stroke-component inset-px flex w-full border border-transparent font-bold">
        <Disclosure.Button className="fill-icon-tertiary flex h-full w-4 items-center justify-center">
          <div >
            <CaretIcon />
          </div>
        </Disclosure.Button>
        <div>{node.name}</div>
      </div>
      <Disclosure.Panel>
        {node.children.map((childNode: HydratedComponentNode) => {
          return <ComponentItem key={childNode.id} node={childNode} />;
        })}
      </Disclosure.Panel>
    </Disclosure>
  );
}
