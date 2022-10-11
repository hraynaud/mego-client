export class EndorsementModel {
  description: string;
  topic: string;
  topicImage?: string;

  constructor(description: string, topic: string, topicImage: string) {
    this.description = description;
    this.topic = topic;
    this.topicImage = topicImage;
  }
}
