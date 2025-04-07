import type { Rule } from 'rc-field-form/lib/interface';

declare global {
  type RulesObject<T> = {
    [k in keyof Partial<T>]: Rule[];
  };
}

declare global {
  interface Window {
    getMetaInfo: any;
  }
}
