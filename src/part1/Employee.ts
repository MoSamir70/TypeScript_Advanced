abstract class Employee {

  public readonly employeeId: string;

  protected _name: string;
  protected _baseSalary: number;

  private _department: string;

  constructor( employeeId: string, name: string, baseSalary: number, department: string
  ) {
    this.employeeId = employeeId;
    this._name = name;
    this._baseSalary = baseSalary;

    this._department = "";
    this.department = department;
  }

  get name(): string { return this._name; }

  get department(): string { return this._department; }

  set department(value: string) {
    const allowedDepartments: string[] = [ "engineering", "sales","hr","finance", ];

    if (!allowedDepartments.includes(value)) {
      throw new Error( `Invalid department: ${value}. Allowed values only are engineering, sales, hr, finance.`);
    }

    this._department = value;
  }

  protected setBaseSalary(value: number): void {
    if (value < 0) { throw new Error("Base salary cannot be negative."); }

    this._baseSalary = value;
  }

  protected getBaseSalary(): number { return this._baseSalary; }

  abstract getRole(): string;

  abstract calculateBonus(): number;

  getPayslip(): string {
    const bonus: number = this.calculateBonus();
    const total: number = this._baseSalary + bonus;

    return `[${this.getRole()}] ${this._name} (ID: ${ this.employeeId }) 
     | Dept: ${this.department}
     | Base: $${ this._baseSalary} 
     | Bonus: $${bonus} 
     | Total: $${total}`;
  }
}

export default Employee;