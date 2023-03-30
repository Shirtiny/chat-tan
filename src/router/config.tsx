import type { RouteObject } from "react-router-dom";
import { redirect } from "react-router-dom";
import ChatLayout from "@/layouts/Chat";
// import ChatPage from "@/pages/Chat";
import ErrorPage from "@/pages/Error";

(window as any).redirect = redirect;

const v1: RouteObject[] = [
  {
    path: "/",
    errorElement: <ErrorPage />,
    element: <ChatLayout />,
    children: [
      {
        index: true,
        path: "chat",
        lazy: async () => {
          const { default: Component } = await import("@/pages/Chat");
          return { loader: () => {}, Component };
        },
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
