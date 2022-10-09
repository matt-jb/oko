import moment from "moment";
import { HttpError } from "routing-controllers";

class Validator {
  private value: any;
  private key: string;

  constructor() {
    this.value = "";
    this.key = "";
  }

  toCheck = (value: any, key: string) => {
    this.value = value;
    this.key = key;

    return this;
  };

  isNotEmpty = (): this | never => {
    if (typeof this.value === "string" && this.value.length === 0)
      throw new HttpError(400, `Missing body param: ${this.key}`);
    return this;
  };

  isDate = (): this | never => {
    if (!moment(this.value, moment.ISO_8601, true).isValid())
      throw new HttpError(400, `${this.key} is not a valid ISO 8601 date`);
    return this;
  };

  isProvided = (): this | never => {
    if (this.value === undefined)
      throw new HttpError(400, `${this.key} is required`);
    return this;
  };

  isBool = (): this | never => {
    if (!(typeof this.value == "boolean"))
      throw new HttpError(400, `${this.key} is not a valid boolean`);
    return this;
  };

  clean = (): this => {
    return this;
  };
}

export default new Validator();
