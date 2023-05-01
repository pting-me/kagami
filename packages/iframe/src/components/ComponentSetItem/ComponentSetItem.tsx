import { Disclosure } from "@headlessui/react";
import {
  HydratedComponentNode,
  HydratedComponentSetNode,
} from "@kagami/common";

import { useSelectedNode } from "../../nodes/useSelectedNode";
import { ComponentItem } from "../ComponentItem/ComponentItem";
import { CaretIcon } from "../Icon/CaretIcon";
import { DownloadIcon } from "../Icon/DownloadIcon";
import { TagInput } from "../TagInput/TagInput";
import { TemplateInput } from "../TemplateInput/TemplateInput";

interface ComponentSetItemProps {
  node: HydratedComponentSetNode;
}

export function ComponentSetItem(props: ComponentSetItemProps) {
  const { node } = props;

  const [, setSelectedNodeId] = useSelectedNode();
  return (
    <Disclosure>
      <div className="single-row hover:bg-fill-hover w-full">
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
        <form
          className="hover:bg-fill-hover flex w-full"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <div className="mr-1">
            <TemplateInput />
          </div>
          <div className="mr-1">
            <TagInput />
          </div>
          <div className="mr-4">
            <button
              type="submit"
              className="hover:border-stroke hover:bg-fill flex h-7 w-7 items-center justify-center rounded-sm border border-transparent"
            >
              <DownloadIcon />
            </button>
          </div>
        </form>
      </div>
      <Disclosure.Panel>
        {node.children.map((childNode: HydratedComponentNode) => {
          return (
            <ComponentItem
              onClick={() => {
                setSelectedNodeId(childNode.id);
              }}
              key={childNode.id}
              node={childNode}
            />
          );
        })}
      </Disclosure.Panel>
    </Disclosure>
  );
}
