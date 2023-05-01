import { ComponentPropsWithoutRef } from "react";

import clsx from "clsx";

import { HydratedComponentNode } from "@kagami/common";

interface ComponentItemProps extends ComponentPropsWithoutRef<"button"> {
  node: HydratedComponentNode;
}

export function ComponentItem(props: ComponentItemProps) {
  const { node, className, ...rest } = props;
  return (
    <button
      className={clsx(
        "single-row text-type-component hover:bg-fill-hover flex w-full overflow-x-hidden text-ellipsis whitespace-nowrap border border-transparent pl-8 pr-4",
        className
      )}
      {...rest}
    >
      <div>{Object.values(node.variantProperties ?? {}).join(", ")}</div>
    </button>
  );
}
