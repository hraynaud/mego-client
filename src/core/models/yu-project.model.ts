import { YuObstacle } from "./yu-obstacle.model";

export interface YuProject {
  name: String;
  description: String;
  startDate: Date;
  deadline: Date;
  obstacles: YuObstacle[];

}
