import { createTimeMessage } from "@figma-react-template/common";

import { sendMessage, useMessage } from "./messaging/main";

function App() {
  const message = useMessage();
  return (
    <div className="container">
      <h1 className="h">Messaging</h1>
      <button className="btn" onClick={() => sendMessage(createTimeMessage())}>
        Send message
      </button>
      <div>{message}</div>
    </div>
  );
}

export default App;
