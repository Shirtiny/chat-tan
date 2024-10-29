import { FC, memo, useLayoutEffect, useEffect, ComponentType } from 'react';
import logger from '@/utils/logger';
import { cls } from '@shirtiny/utils/lib/style';

interface IOptions {
  memorize?: boolean;
}

const defaultOptions = {
  memorize: true,
};

const NAME_PREFIX = '';

export default function component<P>(
  Component: FC<P>,
  options: IOptions = defaultOptions,
): FC<P> {
  const { memorize } = options;
  const componentName = Component.displayName || Component.name || '';
  const Func = (props: any) => {
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

    return (
      <Component {...finalProps} data-comp={`${NAME_PREFIX}${componentName}`} />
    );
  };
  Object.assign(Func, Component);
  Func.displayName = `${componentName}Wrapper`;

  return (memorize ? memo(Func as ComponentType<P>) : Func) as FC<P>;
}
