import { Cleaner } from "./cleaner.model";
import { client } from "./client.model";

export class Session {
  constructor(
    public cleaner: Cleaner,
    public client: client,
    public date: Date,
    public time: string,
    public hours: any,
    public instructions?: string
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
