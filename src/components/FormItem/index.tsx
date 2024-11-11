import { memo, CSSProperties, ReactNode, FC } from 'react';
import { cls } from '@shirtiny/utils/lib/style';

import css from './index.module.scss';

export const formItemLayoutEnum = {
  vertical: 'vertical',
  horizontal: 'horizontal',
};

interface IProps {
  className?: string;
  style?: CSSProperties;
  layout?: keyof typeof formItemLayoutEnum;

  label?: string;
  required?: boolean;
  desc?: string;
  errorMsg?: string;

  children?: ReactNode;

  /**
   * @deprecated formItem的marginBottom 建议使用className控制
   */
  mb?: number;
  /**
   * @deprecated formItem内label和children的间距 建议使用className控制
   */
  gap?: number;
}

const FormItem: FC<IProps> = ({
  className,
  style,
  label,
  required,
  layout = 'vertical',
  desc,
  errorMsg,
  children,
}) => {
  return (
    <div className={cls(css.formItem, className)} style={style}>
      <div className={css[`layout_${layout}`]}>
        {!!label && (
          <label className="form-item-label">
            {label}
            {!!required && <span className="form-item-required">*</span>}
          </label>
        )}
        <div className="form-item-content">{children}</div>
      </div>
      {!!desc && <div className="form-item-desc">{desc}</div>}
      {!!errorMsg && <span className="form-item-warning">{errorMsg}</span>}
    </div>
  );
};
export default memo(FormItem);
