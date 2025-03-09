interface Task {
  name: string;
  notes: string;
  status: string;
}
export class ProjectModel {
  id: string;
  name: string;
  description: string;
  topicImage: string;
  startDate: Date;
  ownerAvatarUrl: string;
  ownerProfileImageUrl: string;
  topicName: string;
  progress: string[];
  openItems: string[];
  roadBlocks: string[];
  tasks: Task[];

  constructor(
    id: string,
    name: string,
    description: string,
    topicImage: string,
    startDate: Date,
    ownerAvatarUrl: string,
    ownerProfileImageUrl: string,
    topicName: string,
    progress: string[], //deprecated
    openItems: string[], //deprecated
    roadBlocks: string[], //deprecated
    tasks: Task[]
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.topicImage = topicImage;
    this.startDate = startDate;
    this.ownerAvatarUrl = ownerAvatarUrl;
    this.ownerProfileImageUrl = ownerProfileImageUrl;
    this.topicName = topicName;
    this.progress = progress;
    this.openItems = openItems;
    this.roadBlocks = roadBlocks;
    this.tasks = tasks;
  }
}
