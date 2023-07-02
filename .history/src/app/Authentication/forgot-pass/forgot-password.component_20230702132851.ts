import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'forgot-password',
  templateUrl: 'forgot-password.component.html',
  styleUrls: ['forgot-password.component.scss'],
  moduleId: module.id
})

export class ForgotPasswordComponent implements OnInit {
  constructor() { }

  ngOnInit() { }
  sendResetEmail() {
    this.http.post('/api/reset-password', { email: this.email }).subscribe(
      (response) => {
        console.log('Reset email sent');
        // Handle success, such as displaying a confirmation message
      },
      (error) => {
        console.error('Error sending reset email:', error);
        // Handle error, such as displaying an error message
      }
    );
  }
}
