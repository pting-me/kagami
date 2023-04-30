import { createContext, PropsWithChildren, useEffect, useState } from "react";

import {
  HydratedComponentNode,
  HydratedComponentSetNode,
} from "@kagami/common";

import { MessageProvider } from "../messaging/MessageContext";
import { useMessage } from "../messaging/useMessage";

interface NodesValue {
  componentNodes: HydratedComponentNode[];
  componentSetNodes: HydratedComponentSetNode[];
}

export const NodesContext = createContext<NodesValue | undefined>(undefined);

function NodesProviderCore(props: PropsWithChildren) {
  const { children } = props;

  const [componentNodes, setComponentNodes] = useState<HydratedComponentNode[]>(
    []
  );
  const [componentSetNodes, setComponentSetNodes] = useState<
    HydratedComponentSetNode[]
  >([]);

  const message = useMessage();

  useEffect(() => {
    switch (message?.type) {
      case "nodes/updateComponents":
        setComponentNodes(message.payload);
        return;
      case "nodes/updateComponentSets":
        setComponentSetNodes(message.payload);
        return;
      default:
    }
  }, [message]);

  return (
    <NodesContext.Provider value={{ componentNodes, componentSetNodes }}>
      {children}
    </NodesContext.Provider>
  );
}

export function NodesProvider(props: PropsWithChildren) {
  const { children } = props;

  return (
    <MessageProvider>
      <NodesProviderCore>{children}</NodesProviderCore>
    </MessageProvider>
  );
}
