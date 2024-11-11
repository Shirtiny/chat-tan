export enum FORMATTER_PRESETS {
  TRIM = 'TRIM',
  NUMBER = 'NUMBER',
}

export enum VALIDATOR_PRESETS {
  REQUIRED = 'REQUIRED',
  EMAIL = 'EMAIL',
}

export type UseFormFormatter = (v: any, oldV?: any) => any;

export interface ValidatorResult {
  name: string;
  pass: boolean;
}

export type UseFormValidator = (args: {
  v: any;
  filedPath?: string[] | string;
}) => ValidatorResult;

export interface UseFormControllerOption {
  name?: string | number;
  filedPath?: Path;
  eventName?: string;
  handler?: (...args: any[]) => { value: any };
  valueHandle?: (v: any) => any;
  formatters?: (FORMATTER_PRESETS | UseFormFormatter)[];
  validators?: (VALIDATOR_PRESETS | UseFormValidator)[];
  updater?: (formattedV: any, oldV: any) => { value: any }; // 为了与字段值区分 updater的返回值必须满足格式 否则updater无效 默认使用format后的值更新
  valueName?: string; // default: 'value' 在 valueControl 为true时生效
  valueDisplay?: (v: any) => any; //在 valueControl 为true时生效
}

export type Path = string | string[];
