import type { ICommonProps } from "@/types";
import { FC, useLayoutEffect } from "react";
import { useNavigation } from "react-router-dom";

import Loading from "@/components/Loading";
import Aside from "./Aside";
import Header from "./Header";

import GlobalContextStore from "@/store/global";
import routerConfig from "@/router/config";
import component from "@/hoc/component";
import theme from "@/styles/theme";
import layout from "@/utils/layout";
import logger from "@/utils/logger";
import env from "@/utils/env";

import "./index.scss";

interface IProps extends ICommonProps {}

const AppLayout: FC<IProps> = ({ className, children, ...rest }) => {
  const { state } = GlobalContextStore.use();
  const navItems = routerConfig.navItems;
  const navigation = useNavigation();

  useLayoutEffect(() => {
    theme.setTheme(state.theme);
    // document.addEventListener("visibilitychange", function logData() {
    //   if (document.visibilityState === "hidden") {
    //     navigator.sendBeacon("/log", analyticsData);
    //   }
    // });

    if (!window) return;
    const isMobile = env.isMobile(window, 750);
    isMobile && layout.vhProperty();

    const clean = layout.remFlexible({
      win: window,
      baseWidth: 1920,
      minWidth: 960,
      baseFontSize: 100,
      mobileWidth: 750,
      mobileBaseWidth: 750,
    })!;

    return () => {
      clean();
    };
  }, []);

  logger.debug("global state", state);

  return (
    <div className="app-layout" {...rest}>
      {navigation.state === "loading" && <Loading />}
      <Header />
      <div className="app-layout__body">
        <Aside navItems={navItems} />
        <main className="app-layout__body__main">{children}</main>
      </div>
    </div>
  );
};

export default component<IProps>(AppLayout);
