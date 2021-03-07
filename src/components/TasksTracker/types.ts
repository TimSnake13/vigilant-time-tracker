import { v4 as uuid } from "uuid";

export class Task {
  id: string;
  name: string;
  categoryID?: string;
  description?: string;
  constructor(name: string, categoryID?: string, description?: string) {
    this.id = uuid();
    this.name = name;
    this.categoryID = categoryID ? categoryID : "";
    this.description = description ? description : "";
  }
}

export class Activity {
  taskID: string;
  startMoment: Moment;
  finishMoment: Moment;
  duration: number;
  constructor(
    taskID: string,
    startMoment: Moment,
    finishMoment: Moment,
    duration: number
  ) {
    this.taskID = taskID;
    this.startMoment = startMoment;
    this.finishMoment = finishMoment;
    this.duration = duration;
  }
}

/**
 * When initializing,
 * it needs the input: moment().format("YYYY-MM-DD HH:mm:ss A") to work properly
 */
export class Moment {
  moment: string;
  date: string;
  time: string;
  a: string;
  constructor(moment: string) {
    this.moment = moment;
    const [date, time, a] = moment.split(" ");
    this.date = date;
    this.time = time;
    this.a = a;
  }
}
