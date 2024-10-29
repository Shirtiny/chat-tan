import {
  FC,
  memo,
  useLayoutEffect,
  useEffect,
  forwardRef,
  ComponentType,
} from 'react';
import logger from '@/utils/logger';
import { cls } from '@shirtiny/utils/lib/style';

interface IOptions {
  memorize?: boolean;
  useForwardRef?: boolean;
}

const defaultOptions = {
  memorize: true,
  useForwardRef: false,
};

const NAME_PREFIX = '';

export default function component<P>(
  Component: FC<P>,
  options: IOptions = defaultOptions,
): FC<P> {
  const { memorize, useForwardRef } = options;
  const componentName = Component.displayName || Component.name;
  const Func = (props: any, ref: any) => {
    useLayoutEffect(() => {
      logger.component(componentName, 'useLayoutEffect');
      return () => {
        logger.component(componentName, 'useLayoutEffect clear');
      };
    }, []);

    useEffect(() => {
      logger.component(componentName, 'useEffect');
      return () => {
        logger.component(componentName, 'useEffect clear');
      };
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

  return (
    memorize ? memo(ForwardFunc as ComponentType<P>) : ForwardFunc
  ) as FC<P>;
}
