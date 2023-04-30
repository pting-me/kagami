import { Disclosure } from "@headlessui/react";
import { HydratedComponentNode } from "@kagami/common";

import { CaretIcon } from "../Icon/CaretIcon";

interface SingleComponentItemProps {
  node: HydratedComponentNode;
}

export function SingleComponentItem(props: SingleComponentItemProps) {
  const { node } = props;
  return (
    <Disclosure>
      <div className="single-row text-type-component hover:border-stroke-component inset-px flex w-full border border-transparent font-bold">
        <Disclosure.Button className="fill-icon-tertiary flex h-full w-4 items-center justify-center">
          <div>
            <CaretIcon />
          </div>
        </Disclosure.Button>
        <div>{node.name}</div>
      </div>
      <Disclosure.Panel className="p-4">Download form</Disclosure.Panel>
    </Disclosure>
  );
}
