import { useContext } from "react";

import { NodeContext } from "./NodeContext";

export function useComponentSetNodes() {
  const nodes = useContext(NodeContext);

  if (nodes === undefined) {
    throw new Error("useComponentSetNodes must be used within a NodeProvider");
  }

  return nodes.componentSetNodes;
}
