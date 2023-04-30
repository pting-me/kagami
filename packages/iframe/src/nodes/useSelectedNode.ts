import { useContext } from "react";

import { NodeContext } from "./NodeContext";

export function useSelectedNode() {
  const nodes = useContext(NodeContext);

  if (nodes === undefined) {
    throw new Error("useComponentSetNodes must be used within a NodeProvider");
  }

  return [nodes.selectedNodeId, nodes.setSelectedNodeId] as [
    typeof nodes.selectedNodeId,
    typeof nodes.setSelectedNodeId
  ];
}
