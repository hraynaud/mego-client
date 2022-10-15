export class EndorsementModel {
  description: string;
  topic: string;
  topicImage?: string;
  id: string;

  constructor(
    description: string,
    topic: string,
    topicImage: string,
    id: string
  ) {
    this.description = description;
    this.topic = topic;
    this.topicImage = topicImage;
    this.id = id;
  }
}
