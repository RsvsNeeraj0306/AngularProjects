import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AuthModule } from '@auth0/auth0-angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule} from '@angular/common/http';
import { CartComponent } from './cart/cart.component';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { LoginFormComponent } from './loginpage/loginpage.component';
import { FormsModule } from '@angular/forms';
import { RegisterpageComponent } from './registerpage/registerpage.component';
import { LogoutComponent } from './logout/logout.component';
import { AdministratorComponent } from './administrator/administrator.component';
import { ReturnComponent } from './return/return.component';
import { AuthButtonComponent } from './auth-button/auth-button.component';

@NgModule({
  declarations: [
    AppComponent,
    CartComponent,
    NavComponent,
    HomeComponent,
    LoginFormComponent,
    RegisterpageComponent,
    LogoutComponent,
    AdministratorComponent,
    ReturnComponent,
    AuthButtonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    AuthModule.forRoot({
      domain: 'dev-em6b2las3eok61xd.us.auth0.com',
      clientId: 'zgrxAui7UxMVRxCu0yHgri6geDwOqIrl',
      authorizationParams: {
        redirect_uri: window.location.origin
      }
    }),
  ],

  bootstrap: [AppComponent],
})
export class AppModule { }
