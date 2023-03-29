import { ReactNode, LazyExoticComponent } from "react";

export interface IRoute {
  key: string;
  path: string;
  label: string;
  to?: string;
  desc?: string;
  routes?: IRoute[];
  icon?: ReactNode;
  Component?: LazyExoticComponent<any>;
}
