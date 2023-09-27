import { Injectable } from '@angular/core';
import { Products } from './products';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MachineService {
  private products: Products[] = [
    new Products(1, 'Chips',10, 1.5,),
    new Products(2, 'Soda',10, 2.0),
    new Products(3, 'Chocolate Bar',10, 1.0),
  ];

  private selectedItem: Products = new Products(0, '',10, 0);
  

  selectProduct(id: number): void {
    const product = this.products.find((p) => p.id === id);
    if (product) {
      this.selectedItem = product;
    }
  }

  getProducts(): Observable<Products[]> {
    return of(this.products);
  }

  
  purchase(): string {
    if (!this.selectedItem) {
      return 'Please select a product first.';
    }

    const price = this.selectedItem.price;
    this.selectedItem = new Products(0, '', 0 ,0);

    return `You've purchased ${this.selectedItem.name} for $${price}.`;
  }

  getSelectedProduct(): Products {
    return this.selectedItem;
  }
}
