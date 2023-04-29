import { getTime } from "@figma-react-template/common";

import { sendMessage } from "./messaging/main";

function App() {
  return (
    <>
      <div>
        <button onClick={() => sendMessage(getTime())}>Send message</button>
      </div>
    </>
  );
}

export default App;
