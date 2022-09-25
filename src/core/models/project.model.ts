export class ProjectModel {
  name: string;
  description: string;
  topicImage: string;

  constructor(name: string, description: string, topicImage: string) {
    this.name = name;
    this.description = description;
    this.topicImage = topicImage;
  }
}
