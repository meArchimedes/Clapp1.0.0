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
    this.http
    .post('https://clapp-368121-70341.firebaseio.com/users.json', user)
    .subscribe(res => {
      console.log(res);
    });
  }

  updateUser(title: string, description: string) {
    this._currentUser.pipe(take(1)).subscribe(User => {
      const updatedUser = new User(

      );
      // Send to a server
      this._currentUser.next(updatedUser);
    });
  }
}
