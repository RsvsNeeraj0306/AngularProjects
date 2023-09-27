import { Component } from '@angular/core';
import { MachineService } from '../machine.service';
@Component({
  selector: 'app-vending-machine',
  templateUrl: './vending-machine.component.html',
  styleUrls: ['./vending-machine.component.css']
})
export class VendingMachineComponent {
  selectedProductId: number = 0;

  constructor(private MachineService  : MachineService) {}
  selectProduct(): void {
    this.MachineService.selectProduct(this.selectedProductId);
  }

  purchaseProduct(): void {
    this.MachineService.purchase();
  }
}
