import { Products } from "./products";

export class  ProductSection {
    
    constructor(public sectionId: number,public sectionName:string, public products: Products[]) {
     
    }
}
