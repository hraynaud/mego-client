import { ref, onMounted } from 'vue';
import { topicService } from '../core/services';
import { TopicModel } from '../core/models';

export function useTopicList() {
  const topics = ref(<Array<TopicModel>>[]);

  const loadTopics = () => {
    topicService
      .getTopics()
      .then((resp: any) => {
        if (resp) {
          setTopics(resp);
          console.log('Topics loaded');
        }
      })
      .catch((error: any): void => {
        console.log(error);
      });
  };

  const setTopics = (resp: any) => {
    const data = resp.data.topics.data;

    data.map((p: any) => {
      topics.value.push(
        new TopicModel(
          p.attributes.name,
          p.attributes.description,
          p.attributes.topicImage
        )
      );
    });
  };

  // const getSortedData = (jsonResponse: any, data: any, key: string) => {
  //   if (jsonResponse[data])
  //     return jsonResponseHandler.setSortedData(jsonResponse, data, key);
  //   else {
  //     return [];
  //   }
  // };

  onMounted(() => {
    loadTopics();
  });

  return {
    topics,
  };
}
