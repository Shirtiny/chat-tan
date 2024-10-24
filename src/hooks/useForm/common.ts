import { lang } from "@shirtiny/utils";
import {
  FORMATTER_PRESETS,
  Path,
  UseFormFormatter,
  UseFormValidator,
  VALIDATOR_PRESETS,
  ValidatorResult,
} from "./type";

export const MESSAGE_LABEL_CHAR = `{{label}}`;

// Formatters
export const formatterPresets: Record<FORMATTER_PRESETS, UseFormFormatter> = {
  [FORMATTER_PRESETS.TRIM]: (v, oldV) => String(v).trim(),
  [FORMATTER_PRESETS.NUMBER]: (v, oldV) => Number(v),
};

// Validators 校验通过则返回true
export const validatorPresets: Record<VALIDATOR_PRESETS, UseFormValidator> = {
  [VALIDATOR_PRESETS.REQUIRED]: ({ v, filedPath }) => ({
    name: "required",
    pass: !!v || typeof v === "number",
    message: `${MESSAGE_LABEL_CHAR} is required.`,
  }),
  [VALIDATOR_PRESETS.EMAIL]: ({ v, filedPath }) => ({
    name: "email",
    pass: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      v,
    ),
    message: `${MESSAGE_LABEL_CHAR} is not email`,
  }),
};

export const toPathArr = (path: Path = []) => {
  return Array.isArray(path) ? path : String(path).split(".");
};

interface FormatPipeParams {
  initValue: any;
  formatters: UseFormFormatter[];
}
export const formatPipe = ({
  initValue,
  formatters = [],
}: FormatPipeParams) => {
  const formatted = formatters.reduce((value, formatter) => {
    if (lang.isFn(formatter)) {
      return formatter(value);
    }
    const formatterFunc =
      lang.isString(formatter) && formatterPresets[formatter];
    return lang.isFn(formatterFunc) ? formatterFunc(value) : value;
  }, initValue);
  return formatted;
};

interface ExecValidateParams {
  value: any;
  validators: (VALIDATOR_PRESETS | UseFormValidator)[];
  filedPath: Path;
}

// 为全校验 会把所有的validator结果返回  注意这里是单个字段的全部validators校验
export const execValidates = ({
  value,
  validators = [],
  filedPath,
}: ExecValidateParams) => {
  const initRs: Record<string, ValidatorResult | boolean> & { pass: boolean } =
    {
      pass: true,
    };
  const results = validators.reduce((rs, validator) => {
    let validatorFunc = undefined;
    if (lang.isFn(validator)) {
      validatorFunc = validator;
    } else {
      validatorFunc = validatorPresets[validator];
    }
    // 此处没有validatorFunc则说明validators有值填错了 校验不通过
    if (!validatorFunc) {
      rs.pass = false;
      return rs;
    }
    // 每个validator相互独立 结果只与value有关
    const result = validatorFunc({ v: value, filedPath });
    // 校验没有结果 或validator返回值不符合规范 无视此validator
    if (!result || !result.name) {
      return rs;
    }
    const { name, pass, message } = result;
    if (!pass) rs.pass = false;
    rs[name] = {
      name,
      pass: !!pass,
      // message与pass无关
      message,
    };
    return rs;
  }, initRs);

  return results;
};
