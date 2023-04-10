const THEME_STORAGE_KEY = "chat-tan-theme";

export enum ColorThemes {
  DARK = "dark",
  LIGHT = "light",
}

const getTheme = (): ColorThemes | null => {
  return localStorage.getItem(THEME_STORAGE_KEY) as ColorThemes;
};

const setTheme = (themeColor: ColorThemes) => {
  const htmlEl = document.querySelector("html")!;
  htmlEl.setAttribute("data-theme", themeColor);
  localStorage.setItem(THEME_STORAGE_KEY, themeColor);
};

const toggleTheme = () => {
  const curTheme = getTheme();
  const newTheme =
    curTheme === ColorThemes.LIGHT ? ColorThemes.DARK : ColorThemes.LIGHT;
  setTheme(newTheme);
  return newTheme;
};

const initTheme = (newThemeColor: ColorThemes) => {
  const curTheme = getTheme();
  setTheme(curTheme || newThemeColor);
};

const theme = { getTheme, setTheme, toggleTheme, initTheme };

export default theme;
