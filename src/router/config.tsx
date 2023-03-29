import { RouteObject, redirect } from "react-router-dom";
import ChatLayout from "@/layouts/Chat";
import ChatPage from "@/pages/Chat";
import ErrorPage from "@/pages/Error";

(window as any).redirect = redirect;

const v1 = [
  {
    path: "/",
    errorElement: <ErrorPage />,
    Element: ChatLayout,
    children: [
      {
        index: true,
        path: "chat",
        element: <ChatPage />,
        // lazy: () => import("@/pages/Chat")
      },
    ],
  },
  // {
  //   // loader: rootLoader,  // useLoaderData()
  //   children: [
  //     {
  //       path: "a/:contactId",
  //       // lazy: () => import("@/pages/Chat"),
  //     },
  //   ],
  // },
];

const routerConfig = { v1 };

export default routerConfig;
