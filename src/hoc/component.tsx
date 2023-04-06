import { FC, memo, useLayoutEffect, useEffect } from "react";
import logger from "@/utils/logger";
import { cls } from "@shirtiny/utils/lib/style";

interface IOptions {
  memorize?: boolean;
}

const defaultOptions = {
  memorize: true,
};

const NAME_PREFIX = "";

export default function component<P>(
  Component: FC<P>,
  options: IOptions = defaultOptions
) {
  const { memorize } = options;
  const componentName = Component.displayName || Component.name;
  const Func: FC<P> = (props: any) => {
    useLayoutEffect(() => {
      logger.component(componentName, "useLayoutEffect");
    }, []);

    useEffect(() => {
      logger.component(componentName, "useEffect");
    }, []);

    return (
      <Component {...props} data-comp={`${NAME_PREFIX}${componentName}`} />
    );
  };
  Object.assign(Func, Component);

  Func.displayName = `${componentName}Wrapper`;
  return memorize ? memo(Func) : Func;
}
