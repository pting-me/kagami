declare global {
  interface Window {
    /**
     * Figma messages to sandbox requires `pluginMessage` property to be set.
     */
    postMessage(
      message: { pluginMessage: unknown },
      targetOrigin: string,
      transfer?: Transferable[]
    ): void;
  }
}

export {};
