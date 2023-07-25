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

  createNewUser(user: User) {
    console.log("entered create new user");
    this.http
    .post('https://clapp-368121-70341.firebaseio.com/users.json', user)
    .subscribe(res => {
      console.log(res);
    });
  }

  updateCurrentUser(updatedUser: User) {
    // this._currentUser.pipe(take(1)).subscribe(user => {
    //   const updatedUser = { ...user, ...updatedUser };
    //   // Send to the server
    //   this._currentUser.next(updatedUser);
    // });
  }
}
