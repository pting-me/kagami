import { useContext } from "react";

import { NodeContext } from "./NodeContext";

export function useComponentNodes() {
  const nodes = useContext(NodeContext);

  if (nodes === undefined) {
    throw new Error("useComponentNodes must be used within a NodeProvider");
  }

  return nodes.componentNodes;
}
