import { FC, useCallback } from 'react';
import type { ICommonProps } from '@/types';
import component from '@/hoc/component';
import { cls, clsPainPattern } from '@shirtiny/utils/lib/style';
import './index.scss';

interface IProps extends ICommonProps {
  withIcon?: boolean;
  type?: 'text';
  theme?: 'primary' | 'blank';
  shape?: 'circle' | 'rect';
  size?: 'small' | 'middle' | 'large';
  active?: boolean;
}

const Button: FC<IProps> = ({
  className,
  style = {},
  active,
  children,
  withIcon,
  type,
  theme = 'blank',
  size = 'middle',
  shape = 'rect',
  ...rest
}) => {
  return (
    <button
      className={cls(
        'button',
        className,
        active && 'button--active',
        withIcon && 'button--with-icon',
        clsPainPattern({ type, theme, shape, size }),
      )}
      style={{
        ...style,
      }}
      {...rest}
    >
      {children}
    </button>
  );
};

export default component<IProps>(Button);
