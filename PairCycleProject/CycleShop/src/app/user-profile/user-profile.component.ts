import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-user-profile',
  template: `
    <ul *ngIf="auth.user$ | async as user" class="profile">
      <h3>{{ user.name }}</h3>
      <h3>{{ user.email }}</h3>
    </ul>`
})
export class UserProfileComponent {
  constructor(public auth: AuthService) {}
}