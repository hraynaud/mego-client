import { EndorsementModel } from './endorsement.model';

export class PersonModel {
  firstName: string;
  lastName: string;
  id: number | string;
  incomingEndorsements?: [EndorsementModel];
  outgoingEndorsements?: [EndorsementModel];
  bio?: string;

  incomingEndorsementsCount() {
    return this.incomingEndorsements?.length;
  }

  outgoingEndorsementsCount() {
    return this.outgoingEndorsements?.length;
  }

  constructor(
    firstName: string,
    lastName: string,
    id: number | string,
    incomingEndorsements?: [EndorsementModel],
    outgoingEndorsements?: [EndorsementModel],
    bio?: string
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.id = id;
    this.bio = bio;
    this.incomingEndorsements = incomingEndorsements;
    this.outgoingEndorsements = outgoingEndorsements;
  }
}
