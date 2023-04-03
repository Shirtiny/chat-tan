import type { CSSProperties, ReactNode } from "react";

export interface ICommonProps {
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
  [key: string]: any;
}
