import { PathAvatar } from 'src/core/models';
export class EndorsementPathModel {
  id: string;
  topic!: string;
  description: string;
  endorseeProfileImageUrl: string;
  endorseeName: string;
  path!: PathAvatar[];

  constructor(
    id: string,
    topic: string,
    description: string,
    endorseeProfileImageUrl: string,
    endorseeName: string,
    path: PathAvatar[]
  ) {
    this.description = description;
    this.topic = topic;
    this.id = id;
    this.endorseeProfileImageUrl = endorseeProfileImageUrl;
    this.endorseeName = endorseeName;
    this.path = path;
  }
}
