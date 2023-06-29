import { Cleaner } from "./cleaner.model";
import { client } from "./client.model";
import { HttpClient } from "@angular/common/http";
import { Session } from "./session.model";
import { Injectable } from "@angular/core";
import { BehaviorSubject, take } from "rxjs";

@Injectable({ providedIn: 'root' })
export class SessionService {
  private _session = new BehaviorSubject<Session>(null);

  constructor(private http: HttpClient) {}

  get session(){
    return this._session.asObservable();
  }

  createNewSession(cleaner: Cleaner, client: client,date: Date,time: string,hours: any,instructions?: string)
  {
    const newSession = new Session(
      cleaner, client, date, time, hours, in
    );
    this.http
      .put('https://ns-ng-course.firebaseio.com/challenge.json', newChallenge)
      .subscribe(res => {
        console.log(res);
      });
    this._currentChallenge.next(newChallenge);
  }
  //   this.cleaner = cleaner;
  //   this.client = client;
  //   this.date = date;
  //   this.hours = hours;
  //   this.time = time;
  //   this.instructions = instructions;
  // }
  createNewSession(
    cleaner: Cleaner,
    client: client,
    date: Date,
    time: string,
    hours: any,
    instructions?: string
  ) {
    const newSession = new Session(cleaner, client, date, time, hours, instructions);
    //save to server
    return this.http.post("https://clapp-368121-70341.firebaseio.com/session.json", newSession).subscribe(res => {
      console.log(res);
    });
  }
}
