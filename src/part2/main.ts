import Stack from "./Stack";


//-------- test 1 with number

const numberStack = new Stack<number>();

numberStack.push(10);
numberStack.push(20);
numberStack.push(30);

console.log("Peek:", numberStack.peek());

console.log("Pop:", numberStack.pop());

console.log("Pop:", numberStack.pop());

console.log("Size:", numberStack.size());

//-------- test 2 with string

const stringStack = new Stack<string>();

stringStack.push("a");
stringStack.push("b");
stringStack.push("c");

console.log(stringStack.pop());
console.log(stringStack.pop());
console.log(stringStack.pop());

try { console.log(stringStack.pop());
} 
catch (error) 
{
  if (error instanceof Error) { console.log(error.message); }
}


//------------------ Test utilities ----------------------------

//---- getProperty Test

import { getProperty, groupBy,} from "./utilities";


const user = {id: "u-1",username: "yehia", age: 28, };

console.log( getProperty(user, "id") );

console.log( getProperty(user, "username"));

console.log( getProperty(user, "age") );

/*
getProperty(user, "email");

Compiler Error:

Argument of type '"email"' is not assignable
to parameter of type '"id" | "username" | "age"'.
*/


//------------------   groupBy Test ---------------------------

const employees =
[
  {id: 1,  name: "Alice", department: "engineering", },

  {id: 2, name: "Bob", department: "sales", },

  { id: 3, name: "Carol", department: "engineering",},

  {id: 4,name: "David",department: "hr",},

  { id: 5, name: "Eve", department: "sales", },

  { id: 6,  name: "Frank",  department: "hr",},
];

const grouped = groupBy( employees, "department");

console.log(grouped);
console.log("--------------------------------end of main 2-----");