export class ProjectModel {
  name: string;
  description: string;
  topicImage: string;
  startDate: Date;
  ownerAvatarUrl: string;
  topicName: string;

  constructor(
    name: string,
    description: string,
    topicImage: string,
    startDate: Date,
    ownerAvatarUrl: string,
    topicName: string
  ) {
    this.name = name;
    this.description = description;
    this.topicImage = topicImage;
    this.startDate = startDate;
    this.ownerAvatarUrl = ownerAvatarUrl;
    this.topicName = topicName;
  }
}
