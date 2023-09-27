import { Component } from '@angular/core';
import { CycleService } from '../app.service';

@Component({
  selector: 'app-return',
  templateUrl: './return.component.html',
  styleUrls: ['./return.component.css']
})
export class ReturnComponent {
  ans=0;
  BorrowedData: any;
 


  constructor(private cycleService: CycleService) {}

  ngOnInit() {
    this.cycleService.borrowedCycle().subscribe(res => {
      this.BorrowedData = res; 
    });

  
  }

  removeFromTheResponse(item:any) {
    console.log(item);
    this.cycleService.borrowedCycleReturn(item).subscribe(
    
      (response: any) => {
        console.log('PUT request successful:', response);
        this.ngOnInit();
      },
         );
  
}



 


}
