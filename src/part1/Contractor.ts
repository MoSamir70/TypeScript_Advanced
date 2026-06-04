import Employee from "./Employee";

class Contractor extends Employee {

  private _hourlyRate: number;
  private _hoursWorked: number;

  constructor(employeeId: string, name: string, department: string, hourlyRate: number, hoursWorked: number) 
  {
    super( employeeId, name,  hourlyRate * hoursWorked, department );

    this._hourlyRate = 1;
    this._hoursWorked = 0;

    this.hourlyRate = hourlyRate;
    this.hoursWorked = hoursWorked;
  }

  get hourlyRate(): number { return this._hourlyRate; }

  set hourlyRate(value: number) {
    if (value <= 0) 
           { 
             throw new Error( "Hourly rate must be greater than zero" ); 
           }
    this._hourlyRate = value;
  }

  get hoursWorked(): number {  return this._hoursWorked; }

  set hoursWorked(value: number) {
    if (value < 0) 
    {  
        throw new Error("Hours worked cannot be negative" );
    }
    this._hoursWorked = value;
  }

  getRole(): string { return "Contractor"; }

  calculateBonus(): number { return 0; }

  logHours(additionalHours: number): void {
    if (additionalHours <= 0) 
    {
      throw new Error("Additional hours must be greater than zero."  );
    }

    this._hoursWorked += additionalHours;

    const updatedSalary = this._hourlyRate * this._hoursWorked;
    this.setBaseSalary(updatedSalary);

  }
}

export default Contractor;