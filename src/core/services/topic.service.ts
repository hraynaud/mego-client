import { apiService } from './api.service';
import { TopicModel } from '../models';

const create = (topic: TopicModel) => {
  debugger;
  apiService.post('/topics', topic);
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
  create,
  deleteTopic,
  updateTopic,
  getTopics,
};
