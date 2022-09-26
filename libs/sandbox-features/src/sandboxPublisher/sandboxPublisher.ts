type Publisher = (pluginMessage: any, options?: UIPostMessageOptions) => void;

const sandboxPublisher: Publisher = (pluginMessage, options) => {
  return 'publisher';
};

export default sandboxPublisher;
