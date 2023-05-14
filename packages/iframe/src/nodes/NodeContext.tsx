import { createContext, PropsWithChildren, useEffect, useState } from "react";

import {
  HydratedComponentNode,
  HydratedComponentSetNode,
} from "@kagami/common";

import { MessageProvider } from "../messaging/MessageContext";
import { sendMessage } from "../messaging/sendMessage";

interface NodeValue {
  componentNodes: HydratedComponentNode[];
  setComponentNodes: React.Dispatch<
    React.SetStateAction<HydratedComponentNode[]>
  >;
  componentSetNodes: HydratedComponentSetNode[];
  setComponentSetNodes: React.Dispatch<
    React.SetStateAction<HydratedComponentSetNode[]>
  >;
  selectedNodeId: string;
  setSelectedNodeId: React.Dispatch<React.SetStateAction<string>>;
}

export const NodeContext = createContext<NodeValue | undefined>(undefined);

function NodeProviderCore(props: PropsWithChildren) {
  const { children } = props;

  const [componentNodes, setComponentNodes] = useState<HydratedComponentNode[]>(
    []
  );
  const [componentSetNodes, setComponentSetNodes] = useState<
    HydratedComponentSetNode[]
  >([]);

  const [selectedNodeId, setSelectedNodeId] = useState<string>("");

  useEffect(() => {
    if (selectedNodeId) {
      sendMessage({
        type: "nodes/selected",
        payload: { nodeId: selectedNodeId },
      });
    }
  }, [selectedNodeId]);

  return (
    <NodeContext.Provider
      value={{
        componentNodes,
        setComponentNodes,
        componentSetNodes,
        setComponentSetNodes,
        selectedNodeId,
        setSelectedNodeId,
      }}
    >
      {children}
    </NodeContext.Provider>
  );
}

export function NodeProvider(props: PropsWithChildren) {
  const { children } = props;

  return (
    <NodeProviderCore>
      <MessageProvider>{children}</MessageProvider>
    </NodeProviderCore>
  );
}
