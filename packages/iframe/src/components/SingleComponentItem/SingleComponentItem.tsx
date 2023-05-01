import { HydratedComponentNode } from "@kagami/common";

import { useSelectedNode } from "../../nodes/useSelectedNode";

interface SingleComponentItemProps {
  node: HydratedComponentNode;
}

export function SingleComponentItem(props: SingleComponentItemProps) {
  const { node } = props;
  const [, setSelectedNodeId] = useSelectedNode();
  return (
    <div
      onClick={() => {
        setSelectedNodeId(node.id);
      }}
      className="single-row section hover:bg-fill-hover p-4"
    >
      <div className="text-type-component overflow-hidden text-ellipsis whitespace-nowrap font-bold">
        {node.name}
      </div>
    </div>
  );
}
