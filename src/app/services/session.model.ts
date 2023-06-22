import { Cleaner } from "./cleaner.model";
import { Housekeeper } from "./housekeeper.model";

export class Session {
  constructor(
    cleaner: Cleaner,
    housekeeper: Housekeeper,
    date: Date,
    time: string,
    hours: any,
    instructions?: string
  ) {
    this.cleaner = cleaner;
    this.housekeeper = housekeeper;
    this.date = date;
    this.hours = hours;
    this.time = time;
    this.instructions = instructions;
  }
  cleaner: Cleaner;
  housekeeper: Housekeeper;
  date: Date;
  time: string;
  hours: any;
  instructions?: string;
}
