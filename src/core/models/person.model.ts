import { EndorsementModel } from './endorsement.model';

export class PersonModel {
  firstName: string;
  lastName: string;
  id: number | string;
  incomingEndorsements?: [EndorsementModel];
  outgoingEndorsements?: [EndorsementModel];
  profileImageUrl?: string;
  avatarUrl?: string;
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
    bio?: string,
    profileImageUrl?: string,
    avatarUrl?: string
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.id = id;
    (this.bio =
      'Culpa labore aliquip ut ex nisi nostrud. Occaecat fugiat fugiat ut velit consequat ullamco elit laborum quis aute eu ipsum duis sunt. Quis eu deserunt proident ut laboris irure aliqua commodo. Pariatur dolor deserunt in culpa amet irure deserunt. Officia sint Lorem esse ex adipisicing veniam in laborum veniam ea fugiat ad qui.'),
      (this.incomingEndorsements = incomingEndorsements);
    this.outgoingEndorsements = outgoingEndorsements;
    this.profileImageUrl = profileImageUrl;
    this.avatarUrl = avatarUrl;
  }
}
