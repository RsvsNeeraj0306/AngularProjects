import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Import FormsModule

import { AppComponent } from './app.component';
import { OdometerComponent } from './odometer/odometer.component';
import { OdometerService } from './odometer.service';

@NgModule({
  declarations: [AppComponent, OdometerComponent],
  imports: [BrowserModule, FormsModule], // Include FormsModule
  providers: [OdometerService],
  bootstrap: [AppComponent],
})
export class AppModule {}
