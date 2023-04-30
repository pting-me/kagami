import { useContext } from "react";

import { NodesContext } from "./NodesContext";

export function useComponentSetNodes() {
  const nodes = useContext(NodesContext);

  if (nodes === undefined) {
    throw new Error("useComponentSetNodes must be used within a NodesProvider");
  }

  return nodes.componentSetNodes;
}
