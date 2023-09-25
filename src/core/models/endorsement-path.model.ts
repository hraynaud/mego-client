export class EndorsementPathModel {
  id: string;
  topic!: string;
  path!: unknown[];
  description: string;

  constructor(id: string, topic: string, path: unknown[], description: string) {
    this.description = description;
    this.topic = topic;
    this.id = id;
    this.path = path;
  }
}
