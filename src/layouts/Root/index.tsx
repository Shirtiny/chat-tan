import type { FC } from "react";
import { Outlet } from "react-router-dom";
import { IconContext } from "react-icons/lib";
import dev from "@shirtiny/utils/lib/dev";

import component from "@/hoc/component";
import AppLayout from "../App";

import GlobalContextStore from "@/store/global";

import logger, { logVersion } from "@/utils/logger";


// import "@fontsource/jetbrains-mono";
import "modern-normalize/modern-normalize.css";
import "./index.scss";

interface IProps {}

logVersion();
(window as any).dev = dev;
logger.log("dev key taskMap");

const RootLayout: FC<IProps> = ({}) => {
  return (
    <IconContext.Provider value={{ className: "react-icon", style: {} }}>
      <GlobalContextStore.Provider>
        <AppLayout>
          <Outlet />
        </AppLayout>
      </GlobalContextStore.Provider>
    </IconContext.Provider>
  );
};

export default component<IProps>(RootLayout);
