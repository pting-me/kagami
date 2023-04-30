import { HydratedComponentNode } from "@kagami/common";

interface ComponentItemProps {
  node: HydratedComponentNode;
}

export function ComponentItem(props: ComponentItemProps) {
  const { node } = props;
  return (
    <div className="single-row text-type-component hover:border-stroke-component inset-px flex w-full border border-transparent pl-8 pr-4">
      <div>{Object.values(node.variantProperties ?? {}).join(", ")}</div>
    </div>
  );
}
