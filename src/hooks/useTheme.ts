import theme, { ColorThemes } from "@/styles/theme";
import { useCallback, useLayoutEffect, useState } from "react";

const useTheme = () => {
  const [curTheme, setCurTheme] = useState(ColorThemes.LIGHT);

  const switchTheme = useCallback((themeType: ColorThemes) => {
    setCurTheme(themeType);
    theme.switchTheme(themeType);
  }, []);

  const toggleTheme = useCallback(() => {
    const newTheme =
      curTheme === ColorThemes.LIGHT ? ColorThemes.DARK : ColorThemes.LIGHT;
    switchTheme(newTheme);
  }, [curTheme]);

  useLayoutEffect(() => {
    switchTheme(ColorThemes.LIGHT);
  },[]);

  return { theme: curTheme, switchTheme, toggleTheme };
};

export default useTheme;
