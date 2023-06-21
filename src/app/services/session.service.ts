import { Cleaner } from "./cleaner.model";
import { Housekeeper } from "./housekeeper.model";
import { HttpClient } from "@angular/common/http";
import { Session } from "./session.model";


export class SessionService {
  // private _session = new BehaviorSubject<Session>
  cleaner: Cleaner;
  housekeeper: Housekeeper;
  date: Date;
  time: string;
  hours: any;
  instructions?: string;
  constructor(private http: HttpClient) {}
  // constructor(
  //   cleaner: Cleaner,
  //   housekeeper: Housekeeper,
  //   date: Date,
  //   time: string,
  //   hours: any,
  //   instructions?: string
  // ) {
  //   this.cleaner = cleaner;
  //   this.housekeeper = housekeeper;
  //   this.date = date;
  //   this.hours = hours;
  //   this.time = time;
  //   this.instructions = instructions;
  // }
  createNewSession(
    cleaner: Cleaner,
    housekeeper: Housekeeper,
    date: Date,
    time: string,
    hours: any,
    instructions?: string
  ) {
    const newSession = new Session(cleaner, housekeeper, date, time, hours, instructions);
    //save to server
    return this.http.post("https://clapp-368121-70341.firebaseio.com/session.json", newSession).subscribe(res => {
      console.log(res);
    });
  }
}
