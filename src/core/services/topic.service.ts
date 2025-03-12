import { apiService } from './api.service';
import { TopicModel } from '../models';

const create = (topic: TopicModel) => {
  apiService.post('/topics', topic);
};

const del = () => {
  console.log('delete topic');
};

const update = () => {
  console.log('update topic');
};

const list = async () => {
  const res = await apiService.get('/topics');
  return res.data.data;
};

export const topicService = {
  create,
  del,
  update,
  list,
};
