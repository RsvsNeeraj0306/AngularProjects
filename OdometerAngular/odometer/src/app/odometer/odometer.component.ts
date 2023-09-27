import { Component } from '@angular/core';
import { OdometerService } from '../odometer.service';

@Component({
  selector: 'app-odometer',
  templateUrl: './odometer.component.html',
  styleUrls: ['./odometer.component.css']
})
export class OdometerComponent {
  odometerLength: number = 2;
  currentReading: number = 12;

  constructor(private odometerService: OdometerService) {
    
   }

  setOdometerLength() {
    this.odometerService.initializeOdometer(this.odometerLength);
    this.currentReading = this.odometerService.getReading();
  }

  getNextReading() {
    this.currentReading = this.odometerService.nextReading(this.currentReading);
  }

  getPreviousReading() {
    this.currentReading = this.odometerService.previousOdometer(this.currentReading);
  }

  resetOdometerLength() {
    this.odometerService.initializeOdometer(this.odometerLength);
    this.currentReading = this.odometerService.getReading();
  }
}
