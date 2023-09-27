import { Component } from '@angular/core';
import { MachineService } from './machine.service';
import { Products } from './products';
import { Observable } from 'rxjs';
import { ProductSection } from './sections';
import { SectionService } from './section.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'vending-machine';
  selectedItem:any;
  selectedProducts: Products[] = [];
  
  p:any;
  products: Products[] = [];
  sections: ProductSection[] = [];
  selectedProductId: number=0;
  isSectionOpen: boolean = false;
  openedSection: ProductSection = new ProductSection(0,'', []); // Initialize with an empty section
  filteredProducts: Products[] = [];
  totalPrice:number=0;

  constructor(private   SectionService:   SectionService) {}

  ngOnInit() {
    // Retrieve all sections and their products
    this.sections = this.SectionService.getAllSections();
  }

  


  selectProductAction(product: Products): void {
    // Find the index of the selected product within the openedSection's products
    const index = this.openedSection.products.findIndex(p => p.id === product.id);

    // Check if the product is found and its quantity is greater than zero
    if (index !== -1 && this.openedSection.products[index].quantity > 0) {
      // Reduce the quantity by one
      this.openedSection.products[index].quantity--;

      // Add the selected product to the selectedProducts array
      this.selectedProducts.push(product);

      // You can also update the quantity in the original products array if needed
      const productIndex = this.products.findIndex(p => p.id === product.id);
      if (productIndex !== -1) {
        this.products[productIndex].quantity--;
      }
    } else {
      console.log('Out of stock');
    }
  }
  
  removeSelectedProduct(productId: number): void {
    // Find the index of the selected product within the selectedProducts array
    const index = this.selectedProducts.findIndex(product => product.id === productId);

    // Check if the product is found in the selectedProducts array
    if (index !== -1) {
      // Remove the product from the selectedProducts array
      this.selectedProducts.splice(index, 1);

      // You can also update the quantity in the original products array if needed
      const productIndex = this.products.findIndex(p => p.id === productId);
      if (productIndex !== -1) {
        this.products[productIndex].quantity++;
      }
    }
  }

  getSelectedProducts(): Products[] {
    return this.selectedProducts;
  }

  openSection(productId: number) {
    // Find the section containing the product with the entered ID
    this.openedSection = this.sections.find(section =>
      section.products.some(product => product.id === productId)
    ) || new ProductSection(0,'', []); // Initialize with an empty section if not found

   
    this.isSectionOpen = !!this.openedSection;

    // Clear the filteredProducts array
    this.filteredProducts = [];
  }

  filterProducts() {
    if (this.isSectionOpen) {
      // Filter products within the opened section based on the selected product ID
      this.filteredProducts = this.openedSection.products.filter(product =>
        product.id === this.selectedProductId
      );
    }
  
  }

  calculateTotalPrice(): number {
    this.totalPrice = 0;

    // Iterate through selected products and sum their prices
    for (const product of this.selectedProducts) {
      this.totalPrice += product.price;
    }

    return this.totalPrice;
  }

  checkout(): number {
    // You can add logic here to finalize the transaction or perform other actions
    console.log('Checkout clicked!');
    console.log('Grand Total: $', this.calculateTotalPrice());
    this.selectedProducts = [];
    return this.totalPrice;
  }
  
  

 
   
}

