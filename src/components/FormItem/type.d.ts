import { CSSProperties, ReactNode } from 'react';

import { formItemLayoutEnum } from './index';

interface FormItemProps {
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
