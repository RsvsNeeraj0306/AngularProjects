// section.service.ts
import { Injectable } from '@angular/core';
import { ProductSection } from './sections';
import { Products } from './products';

@Injectable({
  providedIn: 'root'
})
export class SectionService {
  private sections: ProductSection[] = [
    new ProductSection(1,'Snacks', [
      new Products(1, 'Chips', 10, 1.5),
      new Products(2, 'Soda', 15, 2.0),
      new Products(3, 'Chocolate Bar', 12, 1.0)
    ]),
    new ProductSection(2,'Beverages', [
      new Products(4, 'Water', 20, 1.0),
      new Products(5, 'Juice', 15, 2.5),
      new Products(6, 'Coffee', 10, 2.0)
    ]),
    new ProductSection(3,'Candies', [
      new Products(7, 'Gummy Bears', 8, 0.75),
      new Products(8, 'Lollipops', 12, 0.5),
      new Products(9, 'Mints', 15, 0.25)
    ])
  ];



  constructor() {}

  getAllSections(): ProductSection[] {
    return this.sections;
  }

  getSectionById(sectionId: number): ProductSection | undefined {
    return this.sections.find(section => section.sectionId === sectionId);
  }
  // Add other methods to manage sections and their products
}
