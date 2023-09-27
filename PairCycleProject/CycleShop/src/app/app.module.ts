import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


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
    ReturnComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
