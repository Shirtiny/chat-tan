import type { FC } from "react";
import { useLayoutEffect } from "react";
import { Outlet, useNavigation } from "react-router-dom";
import { IconContext } from "react-icons/lib";
import dev from "@shirtiny/utils/lib/dev";
import Loading from "@/components/Loading";
import component from "@/hoc/component";
import AppLayout from "../App";

import GlobalContextStore from "@/store/global";
import layout from "@/utils/layout";
import logger, { logVersion } from "@/utils/logger";

// import "@fontsource/jetbrains-mono";
import "modern-normalize/modern-normalize.css";
import "./index.scss";

interface IProps {}

logVersion();
(window as any).dev = dev;
logger.log("dev key taskMap");

const RootLayout: FC<IProps> = ({}) => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    if (!window) return;
    layout.vhProperty();
    layout.remFlexible(window, 1920, 100, 900);
  }, []);

  return (
    <IconContext.Provider value={{ className: "react-icon", style: {} }}>
      {navigation.state === "loading" && <Loading />}
      <GlobalContextStore.Provider>
        <AppLayout>
          <Outlet />
        </AppLayout>
      </GlobalContextStore.Provider>
    </IconContext.Provider>
  );
};

export default component<IProps>(RootLayout);
