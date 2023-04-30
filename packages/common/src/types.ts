/**
 * This is a message that will be received in the sandbox
 */
export type MessageForSandbox = SimpleMessage;

/**
 * This is a message that will be received in the iframe
 */
export type MessageForIframe = SimpleMessage;

/* Sample message types */

/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/ban-ts-comment */
type SimpleMessage = string;
// @ts-ignore
type ArrayMessage = string[];
// @ts-ignore
interface ReduxStyleMessage {
  action: string;
  payload: unknown;
}
/* eslint-enable @typescript-eslint/no-unused-vars */
