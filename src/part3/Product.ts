

/// import { Identifiable } from "./Repository";

import type { Identifiable } from "./Repository";

export class Product implements Identifiable
{
    
  readonly id: string;
  name: string;
  price: number;
  category: string;

  constructor( id: string, name: string, price: number,  category: string ) 
  {
    this.id = id;
    this.name = name;
    this.price = price;
    this.category = category;
  }
}