import Employee from "./Employee";
import FullTimeEmployee from "./FullTimeEmployee";
import Contractor from "./Contractor";

const team: Employee[] =
[
  new FullTimeEmployee( "e-001", "Alice", 90000, "engineering", 0.1),

  new FullTimeEmployee( "e-002", "Bob", 70000, "sales", 0.1 ),

  new Contractor( "e-003", "Carol", "hr", 40, 1200),
];

team.forEach((employee: Employee) => {console.log(employee.getPayslip()); });





/*
3- Try to instantiate Employee directly. Write a comment explaining the TypeScript error and why abstract classes produce it.


const employee = new Employee( "e-000", "Test", 1000, "engineering");

TypeScript Error:

Cannot create an instance of an abstract class.

Reason:
Employee is declared as abstract.
Abstract classes are designed to be inherited from and
cannot be instantiated directly.
*/