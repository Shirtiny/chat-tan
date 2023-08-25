import type { ICommonProps } from "@/types";
import { FC, useLayoutEffect } from "react";
import { useNavigation } from "react-router-dom";

import RouterLoading from "@/components/Loading/Router";
import Aside from "./Aside";
import Header from "./Header";

import GlobalContextStore from "@/store/global";
import routerConfig from "@/router/config";
import component from "@/hoc/component";
import theme from "@/styles/theme";
import layout from "@/utils/layout";
import logger from "@/utils/logger";

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
    const { isMobile } = state;
    logger.debug("isMobile", isMobile);

    let cleanVh: Function | undefined;
    isMobile && (cleanVh = layout.vhProperty(window));

    const baseWidth = isMobile ? 750 : 1920;
    const cleanRem = layout.remFlexible({
      win: window,
      baseWidth: baseWidth,
      minWidth: isMobile ? 375 : 960,
      baseFontSize: 100,
      maxWidth: 1920
    })!;

    return () => {
      cleanVh && cleanVh();
      cleanRem && cleanRem();
    };
  }, [state.isMobile]);

  return (
    <div className="app-layout" {...rest}>
      {navigation.state === "loading" && <RouterLoading />}
      <Header />
      <div className="app-layout__body">
        <Aside navItems={navItems} />
        <main className="app-layout__body__main">{children}</main>
      </div>
    </div>
  );
};

export default component<IProps>(AppLayout);
