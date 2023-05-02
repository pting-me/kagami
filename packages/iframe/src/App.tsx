import { useEffect } from "react";

import {
  componentNodes as mockComponentNodes,
  componentSetNodes as mockComponentSetNodes,
} from "../mock/nodes.json";
import { ComponentSetItem } from "./components/ComponentSetItem/ComponentSetItem";
import { SingleComponentItem } from "./components/SingleComponentItem/SingleComponentItem";
import { sendMessage } from "./messaging/sendMessage";
import { useComponentNodes } from "./nodes/useComponentNodes";
import { useComponentSetNodes } from "./nodes/useComponentSetNodes";
import { useSelectedNode } from "./nodes/useSelectedNode";
import { IS_MOCK } from "./utils/env";

function App() {
  const componentSetNodes = useComponentSetNodes();
  const componentNodes = useComponentNodes();
  const [, setSelectedNodeId] = useSelectedNode();

  useEffect(() => {
    sendMessage({ type: "iframe/loaded" });

    if (IS_MOCK) {
      window.postMessage({
        pluginMessage: {
          type: "nodes/update",
          payload: {
            componentSetNodes: mockComponentSetNodes,
            componentNodes: mockComponentNodes,
          },
        },
      });
    }
  }, []);

  return (
    <div className="plugin">
      <div className="panel">
        <div className="single-row px-4" onClick={() => setSelectedNodeId("")}>
          <h1 className="font-bold">Component Sets</h1>
        </div>
        <div className="py-2">
          {componentSetNodes.map((node) => {
            return <ComponentSetItem key={node.id} node={node} />;
          })}
        </div>
      </div>
      <hr />
      <div className="panel">
        <div className="single-row px-4" onClick={() => setSelectedNodeId("")}>
          <h1 className="font-bold">Standalone Components</h1>
        </div>
        <p className="px-4 py-2">
          Standalone components are currently not supported.
        </p>
        <div className="py-2">
          {componentNodes.map((node) => {
            return <SingleComponentItem key={node.id} node={node} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
