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
import env from "@/utils/env";

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
    const isMobile = env.isMobile(window, 550);
    isMobile && layout.vhProperty();

    const clean = layout.remFlexible({
      win: window,
      baseParamsCompute: (clientWidth) => {
        const flag = clientWidth <= 550;
        const baseWidth = flag ? 750 : 910;
        const baseFontSize = (910 / baseWidth) * 100;
        const minWidth = flag ? undefined : 910;
        return { baseWidth, baseFontSize, minWidth };
      },
    })!;

    return () => {
      clean();
    };
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
