import { Params } from '@angular/router';

export class ParamsFactory {
  static create(params: object): Params {
    return params as Params;
  }
}
