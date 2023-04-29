declare global {
  interface Window {
    postMessage(
      message: { pluginMessage: unknown },
      targetOrigin: string,
      transfer?: Transferable[]
    ): void;
  }
}

export {};
