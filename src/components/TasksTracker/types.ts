import { v4 as uuid } from "uuid";

class Task {
  id: string;
  name: string;
  startTime: string;
  finishTime: string;
  constructor(name: string, startTime: string, finishTime: string) {
    this.id = uuid();
    this.name = name;
    this.startTime = startTime;
    this.finishTime = finishTime;
  }
}
export default Task;
