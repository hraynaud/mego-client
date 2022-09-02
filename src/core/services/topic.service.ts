import { apiService } from './api.service';

const newTopic = () => {
  console.log('new topic');
};

const deleteTopic = () => {
  console.log('delete topic');
};

const updateTopic = () => {
  console.log('update topic');
};

const getTopics = () => {
  return apiService.get('/topics');
};

export const topicService = {
  newTopic,
  deleteTopic,
  updateTopic,
  getTopics,
};
