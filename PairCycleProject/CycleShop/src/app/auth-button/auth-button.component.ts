import { Component } from '@angular/core';
import { Inject } from '@angular/core';
// Import the AuthService type from the SDK
import { AuthService } from '@auth0/auth0-angular';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
@Component({
  selector: 'app-auth-button',
  //template: '<button (click)="auth.loginWithRedirect()">Log in</button>'
  template: `
    <ng-container *ngIf="auth.isAuthenticated$ | async; else loggedOut">
      <button (click)="auth.logout({ logoutParams: { returnTo: document.location.origin } })">
        Log out
      </button>
    </ng-container>

    <ng-template #loggedOut>
      <button (click)="auth.loginWithRedirect()">Log in</button>
    </ng-template>
  `,
  styles: [],
})
export class AuthButtonComponent {
  // Inject the authentication service into your component through the constructor
  //constructor(public auth: AuthService) {}
  constructor(@Inject(DOCUMENT) public document: Document, public auth: AuthService) {}


}