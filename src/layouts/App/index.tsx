import type { ICommonProps } from "@/types";
import { FC, useLayoutEffect } from "react";

import Aside from "./Aside";
import Header from "./Header";

import GlobalContextStore from "@/store/global";
import routerConfig from "@/router/config";
import component from "@/hoc/component";
import theme from "@/styles/theme";

import "./index.scss";

interface IProps extends ICommonProps {}

const AppLayout: FC<IProps> = ({ className, children, ...rest }) => {
  const { state } = GlobalContextStore.use();
  const navItems = routerConfig.navItems;

  useLayoutEffect(() => {
    theme.setTheme(state.theme);
    // document.addEventListener("visibilitychange", function logData() {
    //   if (document.visibilityState === "hidden") {
    //     navigator.sendBeacon("/log", analyticsData);
    //   }
    // });
  }, []);

  return (
    <div className="app-layout" {...rest}>
      <Header />
      <div className="app-layout__body">
        <Aside navItems={navItems} />
        <main className="app-layout__body__main">{children}</main>
      </div>
    </div>
  );
};

export default component<IProps>(AppLayout);
