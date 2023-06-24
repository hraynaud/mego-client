import { EndorsementModel } from './endorsement.model';

export class PersonModel {
  firstName: string;
  lastName: string;
  id: number | string;
  endorsers?: [EndorsementModel];
  endorsees?: [EndorsementModel];
  profileImageUrl?: string;
  avatarUrl?: string;
  bio?: string;

  endorsersCount() {
    return this.endorsers?.length;
  }

  endorseesCount() {
    return this.endorsees?.length;
  }

  constructor(
    firstName: string,
    lastName: string,
    id: number | string,
    endorsees?: [EndorsementModel],
    endorsers?: [EndorsementModel],
    bio?: string,
    profileImageUrl?: string,
    avatarUrl?: string
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.id = id;
    this.bio =
      'Culpa labore aliquip ut ex nisi nostrud. Occaecat fugiat fugiat ut velit consequat ullamco elit laborum quis aute eu ipsum duis sunt. Quis eu deserunt proident ut laboris irure aliqua commodo. Pariatur dolor deserunt in culpa amet irure deserunt. Officia sint Lorem esse ex adipisicing veniam in laborum veniam ea fugiat ad qui.';
    this.endorsers = endorsers;
    this.endorsees = endorsees;
    this.profileImageUrl = profileImageUrl;
    this.avatarUrl = avatarUrl;
  }
}
