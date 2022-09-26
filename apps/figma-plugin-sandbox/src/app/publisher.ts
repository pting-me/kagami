type Publisher = (pluginMessage: any, options?: UIPostMessageOptions) => void;

const publisher: Publisher = (pluginMessage, options) => {
  return 'publisher';
};

export default publisher;
