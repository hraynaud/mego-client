export class EndorsementPathModel {
  id: string;
  topic!: string;
  path!: unknown[];
  description: string;
  endorseeProfileImageUrl: string;

  constructor(
    id: string,
    topic: string,
    path: unknown[],
    description: string,
    endorseeProfileImageUrl: string
  ) {
    this.description = description;
    this.topic = topic;
    this.id = id;
    this.path = path;
    this.endorseeProfileImageUrl = endorseeProfileImageUrl;
  }
}
