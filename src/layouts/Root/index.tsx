import type { FC } from "react";
import { useEffect, useCallback, useLayoutEffect } from "react";
import { Outlet, useNavigation } from "react-router-dom";
import { IconContext } from "react-icons/lib";
import reactiveX from "@shirtiny/utils/lib/reactiveX";
import dev from "@shirtiny/utils/lib/dev";
import theme, { ColorThemes } from "@/styles/theme";
import component from "@/hoc/component";
import layout from "@/utils/layout";
import logger, { logVersion } from "@/utils/logger";
import "modern-normalize/modern-normalize.css";
import Loading from "@/components/Loading";
import AppLayout from "../App";
// import "@fontsource/jetbrains-mono";

import "./index.scss";

interface IProps {}

logVersion();
(window as any).dev = dev;
logger.log("dev key taskMap");

const RootLayout: FC<IProps> = ({}) => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    if (!window) return;
    layout.remFlexible(window, 1920, 100, 900);
  }, []);

  useEffect(() => {
    const task = reactiveX.createTimerTask({
      name: "themeSwitchTimer",
      sec: 5,
      request: async (index: number) => {
        logger.log("themeSwitchTimer", index);
        theme.switchTheme(
          index % 2 === 0 ? ColorThemes.FASHION : ColorThemes.MIKU
        );
        return true;
      },
    });
    task.start();
  }, []);

  return (
    <IconContext.Provider value={{ className: "react-icon", style: {} }}>
      {navigation.state === "loading" && <Loading />}
      <AppLayout>
        <Outlet />
      </AppLayout>
    </IconContext.Provider>
  );
};

export default component<IProps>(RootLayout);
