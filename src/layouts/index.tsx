import { FC, ReactNode, useEffect, useCallback, useLayoutEffect } from "react";
import { Link, Outlet, useNavigation } from "react-router-dom";
import { IconContext } from "react-icons/lib";
import reactiveX from "@shirtiny/utils/lib/reactiveX";
import dev from "@shirtiny/utils/lib/dev";
import theme, { ColorThemes } from "@/styles/theme";
import component from "@/hoc/component";
import layout from "@/utils/layout";
import logger from "@/utils/logger";
import "modern-normalize/modern-normalize.css";
// import "@fontsource/jetbrains-mono";

interface IProps {
  loadingEl?: ReactNode;
}

(window as any).dev = dev;
logger.log("dev key taskMap");

const RootAppLayout: FC<IProps> = ({ loadingEl }) => {
  const navigation = useNavigation();

  const loadRef = useCallback((node: HTMLDivElement) => {
    logger.debug("AppLayout", "loadRef", node);
  }, []);

  useLayoutEffect(() => {
    if (!window) return;
    layout.remFlexible(window, 1920, 100, 1000);
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
      {navigation.state === "loading" ? loadingEl : ""}
      <div className="root-app-layout" ref={loadRef}>
        <Link to="/chat">chat</Link>
        <Link to="/">home</Link>
        <Outlet />
      </div>
    </IconContext.Provider>
  );
};

export default component<IProps>(RootAppLayout);
