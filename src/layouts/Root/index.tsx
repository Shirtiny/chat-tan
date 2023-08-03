import type { FC } from "react";
import { Outlet } from "react-router-dom";
import {
  Tolgee,
  DevTools,
  TolgeeProvider,
  FormatSimple,
  LanguageStorage,
  LanguageDetector,
} from "@tolgee/react";
import { IconContext } from "react-icons/lib";
import dev from "@shirtiny/utils/lib/dev";

import Loading from "@/components/Loading";
import AppLayout from "../App";

import component from "@/hoc/component";
import GlobalContextStore from "@/store/global";
import logger, { logVersion } from "@/utils/logger";
import env from "@/utils/env";

// import "@fontsource/jetbrains-mono";
import "modern-normalize/modern-normalize.css";
import "./index.scss";

interface IProps {}

logVersion();
(window as any).dev = dev;

// i18n
const tolgee = Tolgee()
  .use(DevTools())
  .use(FormatSimple())
  .use(LanguageStorage())
  .use(LanguageDetector())
  .init({
    defaultLanguage: "en",
    fallbackLanguage: "en",

    // for development
    apiUrl: import.meta.env.VITE_TOLGEE_API_URL,
    apiKey: import.meta.env.VITE_TOLGEE_API_KEY,

    // for production
    staticData: {
      en: () => import("../../i18n/en.json"),
      "zh-Hans": () => import("../../i18n/zh-Hans.json"),
    },
  });

const RootLayout: FC<IProps> = ({}) => {
  return (
    <TolgeeProvider
      tolgee={tolgee}
      fallback={<Loading />} // loading fallback
    >
      <IconContext.Provider value={{ className: "react-icon", style: {} }}>
        <GlobalContextStore.Provider>
          <AppLayout>
            <Outlet />
          </AppLayout>
        </GlobalContextStore.Provider>
      </IconContext.Provider>
    </TolgeeProvider>
  );
};

export default component<IProps>(RootLayout);
