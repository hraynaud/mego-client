export class ProjectModel {
  name: string;
  description: string;
  topicImage: string;
  ownerAvatarUrl: string;
  topicName: string;

  constructor(
    name: string,
    description: string,
    topicImage: string,
    ownerAvatarUrl: string,
    topicName: string
  ) {
    this.name = name;
    this.description = description;
    this.topicImage = topicImage;
    this.ownerAvatarUrl = ownerAvatarUrl;
    this.topicName = topicName;
  }
}
