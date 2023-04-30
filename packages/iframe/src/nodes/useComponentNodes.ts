import { useContext } from "react";

import { NodesContext } from "./NodesContext";

export function useComponentNodes() {
  const nodes = useContext(NodesContext);

  if (nodes === undefined) {
    throw new Error("useComponentNodes must be used within a NodesProvider");
  }

  return nodes.componentNodes;
}
