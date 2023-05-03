import { ParamMap } from '@angular/router';

export class ParamMapFactory {
  static create(values: object): ParamMap {
    return {
      getAll(name: string): string[] {
        return [];
      },
      has(name: string): boolean {
        return !!this.keys[name];
      },
      keys: Object.keys(values),
      get(name: string): string | null {
        return values[name] ?? null;
      },
    };
  }
}
