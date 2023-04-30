import { useEffect } from "react";

import { Button } from "./components/Button/Button";
import { sendMessage } from "./messaging/sendMessage";
import { useMessage } from "./messaging/useMessage";

function App() {
  const message = useMessage();

  useEffect(() => {
    sendMessage({ type: "iframe/loaded" });
  }, []);

  return (
    <>
      <div className="panel">
        <div className="section single-row">
          <h1 className="font-bold">Sending messages</h1>
        </div>
        <p className="section py-2">
          Open up the console in
          <br />
          <strong>Plugins &gt; Development &gt; Open console</strong>
          <br /> to see the sent message.
        </p>
        <div className="section single-row my-2">
          <Button className="flex-1">Do nothing</Button>
        </div>
      </div>
      <hr />
      <div className="panel">
        <div className="section single-row">
          <h1 className="font-bold">Handling received messages</h1>
        </div>
        <p className="section py-4">
          Click an item in the Figma document to trigger a message. Messages can
          be accessed via the <strong>useMessage</strong> hook.
        </p>
        <p className="section py-4">
          {JSON.stringify(message) ?? "No message has been received."}
        </p>
      </div>
    </>
  );
}

export default App;
