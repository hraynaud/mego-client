import { EndorsementModel } from './endorsement.model';

export class PersonModel {
  id: number | string;
  firstName: string;
  lastName: string;
  endorsees: EndorsementModel[] | undefined;
  endorsers: EndorsementModel[] | undefined;
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
    id: number | string,
    firstName: string,
    lastName: string,
    endorsees?: EndorsementModel[],
    endorsers?: EndorsementModel[],
    bio?: string,
    profileImageUrl?: string,
    avatarUrl?: string
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.id = id;
    this.bio = bio;
    this.endorsees = endorsees;
    this.endorsers = endorsers;

    this.profileImageUrl = profileImageUrl;
    this.avatarUrl = avatarUrl;
  }
}
