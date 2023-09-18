import type { FC } from "react";
import type { ICommonProps } from "@/types";
import type { INavItem } from "@/router/type";
import { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { HiMoon, HiSun } from "react-icons/hi2";
import Button from "@/components/Button";
import ActiveBar from "@/components/ActiveBar";

import GlobalContextStore from "@/store/global";
import component from "@/hoc/component";
import { cls } from "@shirtiny/utils/lib/style";
import logger from "@/utils/logger";
import { ColorThemes } from "@/styles/theme";
import "./index.scss";

interface IProps extends ICommonProps {
  navItems: INavItem[];
}

const AppAside: FC<IProps> = ({ className, style = {}, navItems, ...rest }) => {
  const currentLocation = useLocation();
  const navigate = useNavigate();
  const { state, toggleTheme } = GlobalContextStore.use();

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

  return (
    <aside
      className={cls("app-aside", className)}
      style={{
        ...style,
      }}
      {...rest}
    >
      <nav className="app-aside__nav">
        {navItems.map((item, index) => {
          return (
            <Button
              className="app-aside__nav__item"
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
          className="app-aside__nav__active-bar"
          currentActiveIndex={currentActiveIndex}
          scale={0.5}
          direction="vertical"
        />
      </nav>
      <div className="flex-space"></div>
      <div className="app-aside__options">
        <Button
          className="app-aside__options__theme"
          type="text"
          withIcon
          onClick={toggleTheme}
        >
          {state.theme === ColorThemes.LIGHT ? <HiMoon /> : <HiSun />}
        </Button>
      </div>
    </aside>
  );
};

export default component<IProps>(AppAside);
