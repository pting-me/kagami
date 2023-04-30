import { useEffect } from "react";

import { ComponentSetItem } from "./components/ComponentSetItem/ComponentSetItem";
import { SingleComponentItem } from "./components/SingleComponentItem/SingleComponentItem";
import { sendMessage } from "./messaging/sendMessage";
import { useComponentNodes } from "./nodes/useComponentNodes";
import { useComponentSetNodes } from "./nodes/useComponentSetNodes";

function App() {
  const componentSetNodes = useComponentSetNodes();
  const componentNodes = useComponentNodes();

  useEffect(() => {
    sendMessage({ type: "iframe/loaded" });
  }, []);

  return (
    <>
      <div className="panel">
        <div className="single-row px-4">
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
        <div className="single-row px-4">
          <h1 className="font-bold">Standalone Components</h1>
        </div>
        <p className="py-2">
          {componentNodes.map((node) => {
            return <SingleComponentItem key={node.id} node={node} />;
          })}
        </p>
      </div>
    </>
  );
}

export default App;
