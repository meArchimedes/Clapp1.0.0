import { Cleaner } from "./cleaner.model";
import { client } from "./client.model";

export class Session {
  constructor(
    cleaner: Cleaner,
    client: client,
    date: Date,
    time: string,
    hours: any,
    instructions?: string
  ) {
    this.cleaner = cleaner;
    this.client = client;
    this.date = date;
    this.hours = hours;
    this.time = time;
    this.instructions = instructions;
  }
  cleaner: Cleaner;
  client: client;
  date: Date;
  time: string;
  hours: any;
  instructions?: string;
}
