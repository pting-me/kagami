import { ComponentPropsWithoutRef } from "react";

import clsx from "clsx";

import { HydratedComponentNode } from "@kagami/common";

interface ComponentItemProps extends ComponentPropsWithoutRef<"div"> {
  node: HydratedComponentNode;
}

export function ComponentItem(props: ComponentItemProps) {
  const { node, className, ...rest } = props;
  return (
    <div
      className={clsx(
        "single-row text-type-component hover:border-stroke-component inset-px flex w-full border border-transparent pl-8 pr-4",
        className
      )}
      {...rest}
    >
      <div>{Object.values(node.variantProperties ?? {}).join(", ")}</div>
    </div>
  );
}
