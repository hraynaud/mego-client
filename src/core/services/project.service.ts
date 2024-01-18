import { ProjectModel } from '../models';

const buildProject = (p: any) => {
  console.log('attrs', p);
  return new ProjectModel(
    p.id,
    p.attributes.name,
    p.attributes.description,
    p.attributes.topicImage,
    p.attributes.startDate,
    p.attributes.ownerAvatarUrl,
    p.attributes.ownerProfileImageUrl,
    p.attributes.topicName
  );
};

export const projecteService = {
  buildProject,
};
