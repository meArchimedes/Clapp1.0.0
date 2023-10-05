import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';
import { User} from './user.model'
import { Cleaner } from './cleaner.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
  private _currentUser = new BehaviorSubject<User>(null);

  constructor(private http: HttpClient) {}

  get currentUser() {
    return this._currentUser.asObservable();
  }
  createNewCleaner(cleaner: Cleaner) {
    console.log("entered create new user");
    this.http.post('https://clapp-36.firebaseio.com/cleaners.json', cleaner)
      .subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (error) => {
          console.error('HTTP error occurred:', error);
        },
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
