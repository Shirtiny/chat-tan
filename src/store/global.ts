import type { Draft, Immutable } from "immer";
import { useCallback, useMemo, useReducer } from "react";
import produce from "immer";
import { updatedDiff } from "deep-object-diff";
import createContextStore from "@/store/contextStore";
import useOnlineStatus from "@/hooks/useOnlineStatus";
import useClientWidth from "@/hooks/useClientWidth";
import theme, { ColorThemes } from "@/styles/theme";
import env from "@/utils/env";
import logger from "@/utils/logger";

type State = Immutable<{
  theme: ColorThemes;
}>;

type StateIndexed = State & { [index: string]: any };

type Action = { type: string; name: string; payload: string };

export const globalInitialState: State = {
  theme: theme.getTheme() || ColorThemes.LIGHT,
};

const reducerWithImmer = produce<StateIndexed, [Action]>(
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

const reducer = env.isDev()
  ? (state: StateIndexed, action: Action) => {
      const nextState = reducerWithImmer(state, action);

      const now = new Date();
      logger.group(
        `global state action @${now.toLocaleTimeString()}.${now.getMilliseconds()}`,
        () => {
          logger.globalState.pre(state);
          logger.globalState.action(action);
          logger.globalState.next(nextState);
          logger.globalState.changes(updatedDiff(state, nextState));
        }
      );

      return nextState;
    }
  : reducerWithImmer;

const useGlobalState = (initialState = globalInitialState) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const online = useOnlineStatus();
  const clientWidth = useClientWidth();

  const isMobile = useMemo(() => {
    return env.isMobile(window, 750);
  }, [clientWidth]);

  const toggleTheme = useCallback(() => {
    const newTheme = theme.toggleTheme();
    dispatch({ type: "set", name: "theme", payload: newTheme });
  }, []);

  return {
    state: { ...state, online, isMobile },
    toggleTheme,
  };
};

const GlobalContextStore = createContextStore(useGlobalState);

export default GlobalContextStore;
