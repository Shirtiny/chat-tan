import { merge, set as _set, get as _get } from "lodash";
import { useCallback } from "react";
import { useImmer } from "use-immer";
import { Path, UseFormControllerOption } from "./type";
import { lang } from "@shirtiny/utils";
import useControllers from "./controller";
import { execValidates, MESSAGE_LABEL_CHAR, toPathArr } from "./common";

interface Params {
  defaultValues?: object;
  controllerOptions?: UseFormControllerOption[];
  // 在使用valueControl时 每次渲染中为controller带上value字段 省去输入组件value取值的代码
  valueControl?: boolean;
}

interface FormState {
  values: object;
  validates: object;
}

const useForm = ({
  defaultValues = {},
  controllerOptions = [],
  valueControl = false,
}: Params) => {
  const [formState, update] = useImmer({
    values: defaultValues,
    validates: {},
  });

  const set = useCallback((pathArr: string[], payload: any) => {
    update((draft: FormState) => {
      const oldValue = _get(draft, pathArr);
      const value = lang.isFn(payload) ? payload(oldValue) : payload;
      _set(draft, pathArr, value);
    });
  }, []);

  const deepSet = useCallback((payload: any) => {
    update((draft: FormState) => {
      merge(draft, payload);
    });
  }, []);

  const getForm = useCallback(
    (path: Path) => {
      return _get(formState, toPathArr(path));
    },
    [formState],
  );

  const fillFormValue = useCallback(
    (path: Path, value: any) => {
      set(toPathArr(path), value);
    },
    [set],
  );

  // 所有字段初始取值 均为{pass: true}
  const getValidate = useCallback(
    (filedPath = [], key = "") => {
      const tempPathArr = toPathArr(filedPath);
      const pathArr = key ? [...tempPathArr, key] : tempPathArr;
      return getForm(["validates", ...pathArr]) || { pass: true };
    },
    [getForm],
  );

  // 是否通过
  const isPass = useCallback(
    (filedPath = [], key = "") => {
      const validate = getValidate(filedPath, key);
      return !!validate.pass;
    },
    [getValidate],
  );

  // 只在校验没有通过时返回信息
  const errMsg = useCallback(
    (filedPath = [], key = "", label = "") => {
      const validate = getValidate(filedPath, key);
      return validate.pass
        ? ""
        : validate.message.replace(
            MESSAGE_LABEL_CHAR,
            label || String(filedPath),
          );
    },
    [getValidate],
  );

  // 全字段校验函数
  const validatesFormValues = useCallback(() => {
    // const validates = parse('validates');
    const newValidates = { pass: true };
    controllerOptions.forEach((option, index) => {
      // 解构controllerOption时 注意reg函数处的默认值
      const { filedPath = [], validators = [] } = option;
      const value = getForm(["values", ...toPathArr(filedPath)]);
      const validateResults = execValidates({ value, validators, filedPath });
      // 合并校验结果
      if (!validateResults.pass) newValidates.pass = false;
      set(["validates", ...toPathArr(filedPath)], validateResults);
    });

    deepSet({ validates: newValidates });
    console.log("validatesFormValues", { newValidates });
    return newValidates;
  }, [controllerOptions, deepSet]);

  const submitFormValues = useCallback(() => {
    const validates = validatesFormValues();
    if (validates.pass) {
      return _get(formState, "values");
    }
    return null;
  }, [validatesFormValues]);

  const { reg, controllers } = useControllers({ controllerOptions, set });

  if (valueControl) {
    controllerOptions.forEach((option, index) => {
      const {
        name = index,
        filedPath = [],
        valueName = "value",
        valueHandle = (v) => v,
      } = option;
      const controller: Record<string, any> = controllers[name];
      controller[valueName] = valueHandle(
        getForm(["values", ...toPathArr(filedPath)]),
      );
    });
  }

  return {
    formState,
    fillFormValue,
    getValidate,
    errMsg,
    isPass,
    validatesFormValues,
    submitFormValues,
    reg,
    controllers,
  };
};

export default useForm;
