import type { FC, MutableRefObject } from 'react';
import type { ICommonProps } from '@/types';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { useSpring, animated, config, SpringRef } from '@react-spring/web';
import { kebabCase, camelCase } from 'lodash';
import { cls } from '@shirtiny/utils/lib/style';
import lang from '@shirtiny/utils/lib/lang';
import logger from '@/utils/logger';
import inject from '@/hoc/inject';
import component from '@/hoc/component';

import './index.scss';

type OffsetDirection = 'vertical' | 'horizon';

interface IProps extends ICommonProps {
  activeKeyDataSetName?: string;
  currentActiveIndex?: string | number;
  auto?: boolean;
  direction?: OffsetDirection;
  onActiveEnd?: () => void;
}

interface ISpringApiProperties {
  y: number;
  height: number;
}

const ATTRIBUTE_SUFFIX = 'item';

const formateActiveIndex = (index?: number | string): string => {
  if (lang.isNullOrUndefined(index)) return '';
  if (String(index).endsWith(`-${ATTRIBUTE_SUFFIX}`)) return String(index);
  return `sh-${index}-${ATTRIBUTE_SUFFIX}`;
};

const formateActiveKeyAttributeName = (
  activeKeyDataSetName: string,
): string => {
  return `data-${kebabCase(activeKeyDataSetName)}`;
};

const createBarItemSelector = (
  activeKeyAttributeName: string,
  activeIndex?: number | string,
): string => {
  const value = lang.isNullOrUndefined(activeIndex)
    ? ''
    : `=${formateActiveIndex(activeIndex)}`;
  return `[${activeKeyAttributeName}${value}]`;
};

const calcBarStyle = (
  el: HTMLElement,
  scale = 0.5,
  direction: OffsetDirection,
) => {
  const height = el.offsetHeight * scale;
  const width = el.offsetWidth * scale;
  const isVertical = direction === 'vertical';
  const offsetKey = isVertical ? 'y' : 'x';
  const offset = isVertical
    ? el.offsetTop + (el.offsetHeight - height) / 2
    : el.offsetLeft + (el.offsetWidth - width) / 2;
  return {
    [offsetKey]: offset,
    height,
  };
};

const useActiveBarListener = (arg: {
  elRef: MutableRefObject<HTMLDivElement | null>;
  springApi: SpringRef<ISpringApiProperties>;
  activeKeyAttributeName: string;
  direction: OffsetDirection;
  scale: number;
  enable: boolean;
}) => {
  const { elRef, springApi, enable, activeKeyAttributeName, scale, direction } =
    arg;

  const containerClickListener = useCallback(
    (e: Event) => {
      logger.log('click bar container');
      const el = e.target as HTMLElement;
      const barItemEl = el.closest(
        createBarItemSelector(activeKeyAttributeName),
      );
      logger.doms('bar container', e.target, e.currentTarget, barItemEl);
      if (!barItemEl) return;
      springApi.start(calcBarStyle(el, scale, direction));
    },
    [activeKeyAttributeName, springApi],
  );

  // init
  useEffect(() => {
    if (!enable) return;

    const activeBarNode = elRef.current;
    logger.doms('ActiveBar node', activeBarNode);
    if (!activeBarNode) return;
    const container = activeBarNode.parentElement;
    const firstChild = container?.firstElementChild as HTMLDivElement;
    logger.doms('ActiveBar container', container, firstChild);
    if (!container || !firstChild || firstChild === activeBarNode) return;
    logger.log('add activeBar listener');
    container.addEventListener('click', containerClickListener);
    // update spring
    springApi.set(calcBarStyle(firstChild, scale, direction));
    return () => {
      logger.log('remove activeBar listener');
      container.removeEventListener('click', containerClickListener);
    };
  }, [springApi, containerClickListener, elRef, enable]);
};

const ActiveBar: FC<IProps> = ({
  className,
  activeKeyDataSetName = 'active-bar-key',
  currentActiveIndex,
  auto = false,
  scale = 0.5,
  direction = 'vertical',
  onActiveEnd,
}) => {
  const elRef = useRef<HTMLDivElement | null>(null);

  const { currentActiveKey, activeKeyAttributeName } = useMemo(() => {
    return {
      currentActiveKey: formateActiveIndex(currentActiveIndex),
      activeKeyAttributeName:
        formateActiveKeyAttributeName(activeKeyDataSetName),
    };
  }, [currentActiveIndex, activeKeyDataSetName]);

  const loadRef = useCallback(
    (el: HTMLDivElement) => {
      elRef.current = el;
      if (!el) return;
      const container = el.parentElement;
      if (!container) return;
      Array.from(container.children).forEach((node, index) => {
        if (node instanceof Element) {
          node.setAttribute(activeKeyAttributeName, formateActiveIndex(index));
        }
      });
    },
    [activeKeyAttributeName],
  );

  const handleActiveEnd = useCallback(() => {
    onActiveEnd && onActiveEnd();
  }, [onActiveEnd]);

  const [styles, springApi] = useSpring<ISpringApiProperties>(() => ({
    y: 0,
    height: 0,

    config: config.gentle,
    onRest: () => {
      handleActiveEnd();
    },
  }));

  const switchActiveBar = useCallback(
    ({ currentActiveKey, immediately = false }: any) => {
      logger.debug('switch activeBar', { currentActiveKey });
      const container = elRef.current?.parentElement;
      if (!container) return;
      const currentActiveNode =
        currentActiveKey &&
        container.querySelector(
          createBarItemSelector(activeKeyAttributeName, currentActiveKey),
        );
      if (!currentActiveNode) return;
      // update spring

      immediately
        ? springApi.set(
            calcBarStyle(currentActiveNode as HTMLElement, scale, direction),
          )
        : springApi.start(
            calcBarStyle(currentActiveNode as HTMLElement, scale, direction),
          );
    },
    [activeKeyAttributeName, springApi, direction],
  );

  useActiveBarListener({
    elRef,
    springApi,
    activeKeyAttributeName,
    scale,
    enable: auto,
    direction,
  });

  // current active
  useEffect(() => {
    switchActiveBar({ currentActiveKey });
    const onResize = () => {
      switchActiveBar({ currentActiveKey, immediately: true });
    };
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, [currentActiveKey, switchActiveBar]);

  return (
    <animated.div
      className={cls('active-bar', className)}
      ref={loadRef}
      style={{ ...styles }}
    ></animated.div>
  );
};

export default component<IProps>(
  inject(ActiveBar, (props) => {
    return { activeKeyDataSetName: camelCase(props.activeKeyDataSetName) };
  }),
);
