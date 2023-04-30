import { createContext, PropsWithChildren, useEffect, useState } from "react";

import {
  HydratedComponentNode,
  HydratedComponentSetNode,
} from "@kagami/common";

import { MessageProvider } from "../messaging/MessageContext";
import { sendMessage } from "../messaging/sendMessage";
import { useMessage } from "../messaging/useMessage";

interface NodeValue {
  componentNodes: HydratedComponentNode[];
  componentSetNodes: HydratedComponentSetNode[];
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

  const message = useMessage();

  useEffect(() => {
    switch (message?.type) {
      case "nodes/update":
        setComponentNodes(message.payload.componentNodes);
        setComponentSetNodes(message.payload.componentSetNodes);
        return;
      default:
    }
  }, [message]);

  useEffect(() => {
    sendMessage({
      type: "nodes/selected",
      payload: { id: selectedNodeId },
    });
  }, [selectedNodeId]);

  return (
    <NodeContext.Provider
      value={{
        componentNodes,
        componentSetNodes,
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
    <MessageProvider>
      <NodeProviderCore>{children}</NodeProviderCore>
    </MessageProvider>
  );
}
