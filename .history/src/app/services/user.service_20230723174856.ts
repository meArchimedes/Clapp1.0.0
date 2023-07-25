import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';
import { User} from './user.model'

@Injectable({ providedIn: 'root' })
export class UserService {
  private _currentUser = new BehaviorSubject<User>(null);

  constructor(private http: HttpClient) {}

  get currentUser() {
    return this._currentUser.asObservable();
  }

  createNewuser(title: string, description: string) {
    const newUser = new User(

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
      const updateduser = new User(

      );
      // Send to a server
      this._currentuser.next(updateduser);
    });
  }
}
