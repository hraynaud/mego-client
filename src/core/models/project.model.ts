export class ProjectModel {
  name: string;
  description: string;
  startDate: Date;
  deadline: Date;
  topic: string;
  topicImage: string;

  constructor(
    name: string,
    description: string,
    startDate: Date,
    deadline: Date,
    topic: string,
    topicImage: string
  ) {
    this.name = name;
    this.description = description;
    this.startDate = startDate;
    this.deadline = deadline;
    this.topic = topic;
    this.topicImage = topicImage;
  }
}
