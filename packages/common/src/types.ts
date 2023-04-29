/**
 * This is a message that will be received in the sandbox
 */
export type MessageForSandbox = SimpleMessage;

/**
 * This is a message that will be received in the iframe
 */
export type MessageForIframe = SimpleMessage;

/* Sample message types */

/* eslint-disable @typescript-eslint/no-unused-vars */
type SimpleMessage = string;
type ArrayMessage = string[];
interface ReduxStyleMessage {
  action: string;
  payload: unknown;
}
/* eslint-enable @typescript-eslint/no-unused-vars */
