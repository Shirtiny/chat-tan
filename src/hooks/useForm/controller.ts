import { useCallback, useMemo } from "react";
import { UseFormControllerOption } from "./type";
import { util } from "@shirtiny/utils";
import { execValidates, formatPipe, toPathArr } from "./common";

interface Params {
  set: (pathArr: string[], payload: any) => void;
  controllerOptions: UseFormControllerOption[];
}

// 控制器 直接与input等输入组件交互
const useControllers = ({ controllerOptions, set }: Params) => {
  // 注册控制器 生成input的props用于完成双向绑定
  const reg = useMemo(
    () =>
      util.memo(
        ({
          filedPath = [],
          eventName = "onChange",
          handler = (...args: any[]) => ({ value: args[0] }),
          formatters = [],
          validators = [],
          updater = (formattedV: any, oldV: any) => ({ value: formattedV }),
          valueName = "value",
          valueHandle = (v: any) => v,
        }) => {
          return {
            [eventName]: (...args: any[]) => {
              const filedArr = toPathArr(filedPath);
              if (!filedArr?.length) {
                const err = new Error(
                  `hooks useForm: 字段路径无效, ${{ filedPath: JSON.stringify(filedPath) }}`,
                );
                console.error(err);
                throw err;
              }
              const handlerResult = handler(...args);
              if (!handlerResult) return null;

              const formattedV = formatPipe({
                initValue: handlerResult.value,
                formatters,
              });
              const validateResults = execValidates({
                value: formattedV,
                validators,
                filedPath,
              });

              // 更新value
              set(["values", ...filedArr], (oldValue: any) => {
                const result = updater(formattedV, oldValue);
                return result ? result.value : formattedV;
              });

              set(["validates", ...filedArr], (oldValue: any) => {
                return validateResults;
              });

              return { value: formattedV };
            },
          };
        },
        // TODO: key resolver
      ),
    [set],
  );

  // 用于辅助批量生成controllers
  const controllers = useMemo(() => {
    const r: Record<string, object> = {};
    controllerOptions.forEach((option, index) => {
      const { name = index } = option;
      r[name] = reg(option);
    });
    return r;
  }, [reg, controllerOptions]);

  return { reg, controllers };
};

export default useControllers;
