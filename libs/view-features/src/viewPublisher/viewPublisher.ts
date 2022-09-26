type Publisher = (pluginMessage: any, options?: UIPostMessageOptions) => void;

const viewPublisher: Publisher = (pluginMessage, options) => {
  return 'publisher';
};

export default viewPublisher;
