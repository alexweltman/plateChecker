const Validator = require('validator');

export default class PlateValidator {
  private valid: boolean;
  private message: string;

  public constructor() {
    this.valid = true;
    this.message = "";
  }

  public validate(plateNumber: string): void {
    this.validateNotEmpty(plateNumber)
    if (this.valid) this.validateAlphaNum(plateNumber);
  }

  private validateAlphaNum(plateNumber: string): void {
    this.valid = Validator.isAlphanumeric(plateNumber);
    if (!this.valid) this.message = "Plate number may only contain numbers and letters.";
  }

  private validateNotEmpty(plateNumber: string) {
    this.valid = plateNumber !== "";
    if (!this.valid) this.message = "Plate number is required.";
  }

  public hasError(): boolean {
    return !this.valid;
  }

  public getMessage(): string {
    return this.message;
  }

  public reset(): void {
    this.valid = true;
    this.message = "";
  }
}
