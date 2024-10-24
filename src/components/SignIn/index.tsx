import { ChangeEvent, useRef, type FC } from "react";
import type { ICommonProps } from "@/types";
import component from "@/hoc/component";
import { cls } from "@shirtiny/utils/lib/style";
import css from "./index.module.scss";
import Input from "../Input";
import useForm from "@/hooks/useForm";
import logger from "@/utils/logger";

interface IProps extends ICommonProps {}

const controllerOptions = [
  {
    name: "phone",
    filedPath: "phone",
    valueName: "value",
    handler: (e: ChangeEvent<HTMLInputElement>) => ({ value: e.target.value }),
  },
  // {
  //   name: "usage",
  //   filedPath: "usage",
  //   eventName: "onClicked",
  //   handler: ({ checked }) => {
  //     return { value: checked ? 3 : 1 };
  //   },
  //   valueName: "checked",
  //   valueHandle: (v) => v === 3,
  // },
];

const SignIn: FC<IProps> = ({ className, style = {}, ...rest }) => {
  const { controllers, formState, errMsg, submitFormValues, isPass } = useForm({
    defaultValues: {
      phone: "",
      code: "",
    },
    controllerOptions,
    valueControl: true,
  });

  console.log("controllers", controllers);

  return (
    <div
      className={cls(css.signIn, className)}
      style={{
        ...style,
      }}
      {...rest}
    >
      登录
      <Input {...controllers.phone} />
    </div>
  );
};

export default component<IProps>(SignIn);
