import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { GetpostsComponent } from './getposts/getposts.component';
import { FormsModule } from '@angular/forms';
import { TagInputModule } from 'ngx-chips';
import { NgChipsComponent } from './ng-chips/ng-chips/ng-chips.component';


@NgModule({
  declarations: [
    AppComponent,
    GetpostsComponent,
    NgChipsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
        HttpClientModule,
        FormsModule,
        TagInputModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
