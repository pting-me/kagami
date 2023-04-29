import { useEffect, useState } from "react";

import { MessageForIframe } from "@figma-react-template/common";

interface MessageData {
  pluginMessage: MessageForIframe;
  pluginId: string;
}

export function useMessage() {
  const [messageEvent, setMessageEvent] = useState<MessageEvent<MessageData>>();

  useEffect(() => {
    window.onmessage = (e: MessageEvent<MessageData>) => {
      setMessageEvent(e);
    };
  }, []);

  return messageEvent?.data.pluginMessage;
}
