import { v4 as uuid } from "uuid";

class Task {
  id: string;
  name: string;
  startMoment: Moment;
  finishMoment: Moment;
  constructor(name: string, startMoment: Moment, finishMoment: Moment) {
    this.id = uuid();
    this.name = name;
    this.startMoment = startMoment;
    this.finishMoment = finishMoment;
  }
}
export default Task;

/**
 * When initializing, it needs the input: moment().format("YYYY-MM-DD HH:mm:ss A") to work properly
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
