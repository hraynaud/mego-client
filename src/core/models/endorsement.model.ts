export class EndorsementModel {
  description: string;
  topic: string;
  topicImage?: string;
  id: string;
  endorserId: string;
  endorseeId: string;
  endorserAvatarUrl: string;
  endorseeAvatarUrl: string;

  constructor(
    description: string,
    topic: string,
    topicImage: string,
    id: string,
    endorserId: string,
    endorseeId: string,
    endorserAvatarUrl: string,
    endorseeAvatarUrl: string
  ) {
    this.description = description;
    this.topic = topic;
    this.topicImage = topicImage;
    this.id = id;
    this.endorserId = endorserId;
    this.endorseeId = endorseeId;
    this.endorserAvatarUrl = endorserAvatarUrl;
    this.endorseeAvatarUrl = endorseeAvatarUrl;
  }
}
