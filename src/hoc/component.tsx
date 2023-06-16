import { FC, memo, useLayoutEffect, useEffect, forwardRef } from "react";
import logger from "@/utils/logger";
import { cls } from "@shirtiny/utils/lib/style";

interface IOptions {
  memorize?: boolean;
  useForwardRef?: boolean;
}

const defaultOptions = {
  memorize: true,
  useForwardRef: false,
};

const NAME_PREFIX = "";

export default function component<P>(
  Component: FC<P>,
  options: IOptions = defaultOptions
) {
  const { memorize, useForwardRef } = options;
  const componentName = Component.displayName || Component.name;
  const Func = (props: any, ref: any) => {
    useLayoutEffect(() => {
      logger.component(componentName, "useLayoutEffect");
    }, []);

    useEffect(() => {
      logger.component(componentName, "useEffect");
    }, []);

    const finalProps = {
      ...props,
    };
    ref && (finalProps.ref = ref);

    return (
      <Component {...finalProps} data-comp={`${NAME_PREFIX}${componentName}`} />
    );
  };
  Object.assign(Func, Component);
  Func.displayName = `${componentName}Wrapper`;

  const ForwardFunc = useForwardRef ? forwardRef(Func) : Func;

  return memorize ? memo(ForwardFunc) : ForwardFunc;
}
