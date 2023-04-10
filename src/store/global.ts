import type { Draft, Immutable } from "immer";
import { useCallback, useReducer } from "react";
import produce from "immer";
import createContextStore from "@/store/contextStore";
import theme, { ColorThemes } from "@/styles/theme";
import { useOnlineStatus } from "@/hooks/useOnlineStatus";

type State = Immutable<{
  theme: ColorThemes;
}>;

type Action = { type: string; name: string; payload: string };

export const globalInitialState: State = {
  theme: theme.getTheme() || ColorThemes.LIGHT,
};

const reducer = produce<State & { [index: string]: any }, [Action]>(
  (draft, { type, name, payload }) => {
    switch (type) {
      case "set": {
        draft[name] = payload;
        break;
      }
      default:
        break;
    }
  }
);

const useGlobalState = (initialState = globalInitialState) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const online = useOnlineStatus();

  const toggleTheme = useCallback(() => {
    const newTheme = theme.toggleTheme();
    dispatch({ type: "set", name: "theme", payload: newTheme });
  }, []);

  return { state: { ...state, online }, toggleTheme };
};

const GlobalContextStore = createContextStore(useGlobalState);

export default GlobalContextStore;
