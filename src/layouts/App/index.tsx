import type { ICommonProps } from "@/types";
import type { INavItem } from "@/router/type";
import { ColorThemes } from "@/styles/theme";
import { FC, useEffect } from "react";
import { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Image from "@/components/Image";
import Button from "@/components/Button";
import ActiveBar from "@/components/ActiveBar";
// import Notice from "@/components/Notice";
import { HiMoon, HiSun } from "react-icons/hi2";

import component from "@/hoc/component";
import routerConfig from "@/router/config";
import logger from "@/utils/logger";

import "./index.scss";

interface IProps extends ICommonProps {
  theme?: ColorThemes;
  toggleTheme?: () => void;
}

const AppLayout: FC<IProps> = ({
  className,
  children,
  theme,
  toggleTheme,
  ...rest
}) => {
  const navItems = routerConfig.navItems;
  const currentLocation = useLocation();
  const navigate = useNavigate();

  const { currentActiveIndex } = useMemo(() => {
    let tempIndex;
    const route = navItems.find((r, index) => {
      const flag = currentLocation.pathname.endsWith(r.path);
      if (flag) tempIndex = index;
      return flag;
    });
    logger.debug("current route", {
      route,
      currentActiveIndex: tempIndex,
      currentLocation,
    });
    return { currentActiveIndex: tempIndex };
  }, [currentLocation.pathname]);

  const handleNavItemClick = (item: INavItem) => {
    navigate(item.path, { replace: true });
  };

  useEffect(() => {
    navigate(navItems[0].path);
  }, []);

  return (
    <div className="app-layout" {...rest}>
      <header className="app-layout__header">
        <a href="/" target="_blank">
          <Image height="100%" src="/logo.svg" name="logo.svg" alt="logo" />
        </a>
        {/* <div className="flex-space"></div> */}
        {/* <Notice /> */}
      </header>
      <div className="app-layout__body">
        <aside className="app-layout__body__sidebar">
          <nav className="app-layout__body__sidebar__nav">
            {navItems.map((item, index) => {
              return (
                <Button
                  className="app-layout__body__sidebar__nav__item"
                  key={item.path}
                  onClick={() => handleNavItemClick(item)}
                  shape="rect"
                  type="text"
                  active={currentActiveIndex === index}
                  withIcon
                >
                  {item.icon}
                </Button>
              );
            })}
            <ActiveBar
              className="app-layout__body__sidebar__nav__active-bar"
              currentActiveIndex={currentActiveIndex}
              scale={0.5}
            />
          </nav>
          {/* <div className="flex-space"></div> */}
          <div className="app-layout__body__sidebar__options">
            <Button
              className="app-layout__body__sidebar__options__theme"
              type="text"
              withIcon
              onClick={toggleTheme}
            >
              {theme === ColorThemes.LIGHT ? <HiMoon /> : <HiSun />}
            </Button>
          </div>
        </aside>
        <main className="app-layout__body__main">{children}</main>
      </div>
    </div>
  );
};

export default component<IProps>(AppLayout);
