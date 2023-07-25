import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';
import { User} from './user.model'

@Injectable({ providedIn: 'root' })
export class UserService {
  private _currentuser = new BehaviorSubject<User>(null);

  constructor(private http: HttpClient) {}

  get currentuser() {
    return this._currentuser.asObservable();
  }

  createNewuser(title: string, description: string) {
    const newUser = new User(
      title,
      description,
      new Date().getFullYear(),
      new Date().getMonth()
    );
    this.http
      .put('https://ns-ng-course.firebaseio.com/user.json', newuser)
      .subscribe(res => {
        console.log(res);
      });
    this._currentuser.next(newUser);
  }

  updateuser(title: string, description: string) {
    this._currentuser.pipe(take(1)).subscribe(user => {
      const updateduser = new user(
        title,
        description,
        user.year,
        user.month,
        user.days
      );
      // Send to a server
      this._currentuser.next(updateduser);
    });
  }

  updateDayStatus(dayInMonth: number, status: DayStatus) {
    this._currentuser.pipe(take(1)).subscribe(user => {
      if (!user || user.days.length < dayInMonth) {
        return;
      }
      const dayIndex = user.days.findIndex(
        d => d.dayInMonth === dayInMonth
      );
      user.days[dayIndex].status = status;
      this._currentuser.next(user);
      console.log(user.days[dayIndex]);
      // Save this to a server
    });
  }
}
