import Employee from "./Employee";

class FullTimeEmployee extends Employee {
  private _bonusMultiplier: number;

  constructor( employeeId: string, name: string, baseSalary: number, department: string, bonusMultiplier: number
  ) {
    super(employeeId, name, baseSalary, department);

    this._bonusMultiplier = 0.05;
    this.bonusMultiplier = bonusMultiplier;
  }

  get bonusMultiplier(): number { return this._bonusMultiplier;}

  set bonusMultiplier(value: number) {
    if (value < 0.05 || value > 0.5) {
      throw new Error( "Bonus multiplier must be between 0.05 and 0.50.");
    }

    this._bonusMultiplier = value;
  }

  getRole(): string { return "Full-Time";}

  calculateBonus(): number { return this._baseSalary * this._bonusMultiplier; }

  promote(newSalary: number,newMultiplier: number): void {
    this.setBaseSalary(newSalary);
    this.bonusMultiplier = newMultiplier;
  }
}

export default FullTimeEmployee;