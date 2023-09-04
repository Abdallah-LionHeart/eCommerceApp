export interface ProductCreate {
 name: string;
 photoUrl: string;
 specification: string;
 generation: string;
 price: number;
 condition: string;
 quantity: number;
 storageSize: string;
 ramSize: string;
 touchScreen: boolean;
 productTypeId: number;
 productBrandId: number;
}

export class ProductFormValues implements ProductCreate {
 name = '';
 photoUrl = '';
 specification = '';
 generation = '';
 price = 0;
 condition = '';
 quantity = 0;
 storageSize = '';
 ramSize = '';
 touchScreen = true;
 productTypeId!: number;
 productBrandId!: number;

 constructor(init?: ProductFormValues) {
  Object.assign(this, init);
 }

}