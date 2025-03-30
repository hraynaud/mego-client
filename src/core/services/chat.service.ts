import chatApi from './api/chat.api';
import { StreamOptions } from './api.service';
const send = (message: string) => {
  return chatApi.send(message);
};

/**
 * Send a message to the chat API with streaming response
 * @param message The message to send
 * @param options Callbacks for stream events
 * @returns EventSource object that can be used to close the connection
 */
const sendStream = (message: string, options: StreamOptions): EventSource => {
  return chatApi.sendStream(message, options);
};
export const chatService = {
  send,
  sendStream,
};
