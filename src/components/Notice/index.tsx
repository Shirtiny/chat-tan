import type { FC } from 'react';
import type { ICommonProps } from '@/types';

import component from '@/hoc/component';
import { cls } from '@shirtiny/utils/lib/style';
import './index.scss';

interface IProps extends ICommonProps {}

const Notice: FC<IProps> = ({ className, style = {}, ...rest }) => {
  return (
    <div
      className={cls('notice', className)}
      style={{
        ...style,
      }}
      {...rest}
    ></div>
  );
};

export default component<IProps>(Notice);
