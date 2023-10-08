// import { Cleaner } from "./cleaner.model";
// import { client } from "./client.model";
// import { HttpClient } from "@angular/common/http";
// import { Session } from "./session.model";
// import { Injectable } from "@angular/core";
// import { BehaviorSubject, take } from "rxjs";

// @Injectable({ providedIn: "root" })
// export class SessionService {
//   private _session = new BehaviorSubject<Session>(new Session(""));

//   constructor(private http: HttpClient) {}

//   get session() {
//     return this._session.asObservable();
//   }

//   createNewSession(
//     cleaner: Cleaner,
//     client: client,
//     date: Date,
//     time: string,
//     hours: any,
//     instructions?: string
//   ) {
//     const newSession = new Session(
//       cleaner,
//       client,
//       date,
//       time,
//       hours,
//       instructions
//     );
//     this.http
//       .post(
//         "https://clapp-368121-70341.firebaseio.com/session.json",
//         newSession
//       )
//       .subscribe((res) => {
//         console.log(res);
//       });
//     this._session.next(newSession);
//   }

//   updatesession(
//     cleaner: Cleaner,
//     client: client,
//     date: Date,
//     time: string,
//     hours: any,
//     instructions?: string
//   ) {
//     this._session.pipe(take(1)).subscribe((session) => {
//       const updatedsession = new Session(
//         cleaner,
//         client,
//         date,
//         time,
//         hours,
//         instructions
//       );
//       // Send to a server
//       this._session.next(updatedsession);
//     });
//   }
// }
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  constructor(private cookieService: CookieService) {}

  createSession(sessionData: any) {
    const sessionDataString = JSON.stringify(sessionData);
    this.cookieService.set('session', sessionDataString, { expires: 1 });
  }

  getSessionData(): any {
    const sessionDataString = this.cookieService.get('session');
    return sessionDataString ? JSON.parse(sessionDataString) : null;
  }

  clearSession() {
    this.cookieService.delete('session');
  }
}
