/* eslint-disable @typescript-eslint/no-explicit-any */

export class EndorsementFormModel {
  topicId?: number;
  endorseeId?: number;

  newTopic?: {
    name: string;
    description: string;
  };
  newPerson?: {
    first: string;
    last: string;
    email: string;
  };
  description: string | undefined;
}
