import { useCallback, useState } from "react";
import createContextStore from "@/store/contextStore";
import theme, { ColorThemes } from "@/styles/theme";
import { useOnlineStatus } from "@/hooks/useOnlineStatus";

export const globalInitialState = {
  theme: theme.getTheme() || ColorThemes.LIGHT,
};

const useGlobalState = (initialState = globalInitialState) => {
  const [state, setState] = useState(initialState);

  const online = useOnlineStatus();

  const toggleTheme = useCallback(() => {
    const newTheme = theme.toggleTheme();
    setState((s) => ({ ...s, theme: newTheme }));
  }, []);

  return { state: { ...state, online }, toggleTheme };
};

const GlobalContextStore = createContextStore(useGlobalState);

export default GlobalContextStore;
