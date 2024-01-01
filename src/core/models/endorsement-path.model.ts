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
    this.description =
      'Culpa labore aliquip ut ex nisi nostrud. Occaecat fugiat fugiat ut velit consequat ullamco elit laborum quis aute eu ipsum duis sunt. Quis eu deserunt proident ut laboris irure aliqua commodo. Pariatur dolor deserunt in culpa amet irure deserunt. Officia sint Lorem esse ex adipisicing veniam in laborum veniam ea fugiat ad qui.';
    this.topic = topic;
    this.id = id;
    this.path = path;
    this.endorseeProfileImageUrl = endorseeProfileImageUrl;
  }
}
