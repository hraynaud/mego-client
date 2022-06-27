import { YuProject } from "./yu-project.model";

export interface YuObstacle {
    description: string;
    obstacleCategory: string;
    isCleared: boolean;
    project: YuProject;
  }
  