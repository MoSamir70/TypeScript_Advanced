import { Repository, } from "./Repository";

import { Product, } from "./Product";


const productRepo = new Repository<Product>();

// Add 5 Products

productRepo.add(new Product(  "p1",  "Laptop",  1200,  "Electronics") );

productRepo.add( new Product( "p2", "Keyboard", 80, "Electronics" ));

productRepo.add( new Product( "p3","Mouse",40,"Electronics" ));

productRepo.add(new Product(  "p4",  "Desk",  200,  "Furniture") );

productRepo.add( new Product(   "p5",   "Chair",   150, "Furniture"));


// Duplicate ID Test

try { productRepo.add(  new Product(  "p1",  "Monitor",  300,  "Electronics"));
} catch (error) {
  if (error instanceof Error) { console.log("Duplicate Error:", error.message ); }
}


// Get By Id

console.log( "Get p2:", productRepo.getById("p2") );

// Update

const updated = productRepo.update(  "p2",  { price: 100, });

console.log( "Updated:", updated );



// count before remove

console.log( "Count Before:",  productRepo.count() );

// count after remove

console.log( "Count After:",productRepo.count());


// Find

const expensiveProducts = productRepo.find(  product =>  product.price > 50);

console.log( "Price > 50:", expensiveProducts);


// not Found

console.log( "Not Found:", productRepo.getById(  "unknown"));

