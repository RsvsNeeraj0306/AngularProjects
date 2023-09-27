import { Component } from '@angular/core';
import { Products } from '../products';
import { MachineService } from '../machine.service';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent {
  selectedProduct: Products = new Products(0, '',0, 0);
  message: string = '';

  constructor(private MachineService: MachineService) {}

  ngOnInit(): void {
    this.selectedProduct = this.MachineService.getSelectedProduct();
    };
  }