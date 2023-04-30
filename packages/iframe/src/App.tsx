import { createTimeMessage } from "@figma-react-template/common";

import { Button } from "./components/Button/Button";
import { sendMessage } from "./messaging/sendMessage";
import { useMessage } from "./messaging/useMessage";

function App() {
  const message = useMessage();
  return (
    <div className="container">
      <div className="section">
        <h1 className="heading">Sending messages</h1>
        <p>
          Open up the console in
          <br />
          <strong>Plugins &gt; Development &gt; Open console</strong>
          <br /> to see the sent message.
        </p>
        <Button onClick={() => sendMessage(createTimeMessage())}>
          Send message
        </Button>
      </div>
      <hr />
      <div className="section">
        <h1 className="heading">Handling received messages</h1>
        <p>
          Click an item in the Figma document to trigger a message. Messages can
          be accessed via the <strong>useMessage</strong> hook.
        </p>
        <p>{message ?? "No message has been received."}</p>
      </div>
    </div>
  );
}

export default App;
