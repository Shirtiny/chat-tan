import type { RouteObject } from "react-router-dom";
import { redirect } from "react-router-dom";
import RootAppLayout from "@/layouts/index";
import ChatLayout from "@/layouts/Chat";
import ErrorPage from "@/pages/Error";
import NotFoundPage from "@/pages/404";
import Loading from "./Loading";

(window as any).redirect = redirect;

const v1: RouteObject[] = [
  {
    path: "/",
    errorElement: <ErrorPage />,
    element: <RootAppLayout loadingEl={<Loading />} />,
    children: [
      {
        index: true,
        path: "chat",
        lazy: async () => {
          const { default: Component } = await import("@/pages/Chat");
          return { loader: () => null, Component };
        },
      },
      { path: "*", element: <NotFoundPage /> },
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
