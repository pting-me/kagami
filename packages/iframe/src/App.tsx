import { useEffect } from "react";

import { ComponentSetItem } from "./components/ComponentSetItem/ComponentSetItem";
import { SingleComponentItem } from "./components/SingleComponentItem/SingleComponentItem";
import { sendMessage } from "./messaging/sendMessage";
import { useComponentNodes } from "./nodes/useComponentNodes";
import { useComponentSetNodes } from "./nodes/useComponentSetNodes";
import { useSelectedNode } from "./nodes/useSelectedNode";

function App() {
  const componentSetNodes = useComponentSetNodes();
  const componentNodes = useComponentNodes();
  const [, setSelectedNodeId] = useSelectedNode();

  useEffect(() => {
    sendMessage({ type: "iframe/loaded" });
  }, []);

  return (
    <div>
      <div className="panel">
        <div className="single-row px-4" onClick={() => setSelectedNodeId("")}>
          <h1 className="font-bold">Component Sets</h1>
        </div>
        <p className="py-2">
          {componentSetNodes.map((node) => {
            return <ComponentSetItem key={node.id} node={node} />;
          })}
        </p>
      </div>
      <hr />
      <div className="panel">
        <div className="single-row px-4" onClick={() => setSelectedNodeId("")}>
          <h1 className="font-bold">Standalone Components</h1>
        </div>
        <p className="py-2">
          {componentNodes.map((node) => {
            return <SingleComponentItem key={node.id} node={node} />;
          })}
        </p>
      </div>
    </div>
  );
}

export default App;
