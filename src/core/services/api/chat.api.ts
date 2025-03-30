import { apiService, StreamOptions } from '../api.service';
const send = async (message: string) => {
  const resp = await apiService.post('/chat', { message: message });

  return apiService.extractReponseData(resp);
};

const sendStream = async (message: string, options: StreamOptions) =>
  await apiService.sendStream(message, options);

export default {
  send,
  sendStream,
};
