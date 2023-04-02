import type { RouteObject } from "react-router-dom";
import { redirect } from "react-router-dom";
import RootLayout from "@/layouts/Root/index";
import ErrorPage from "@/pages/Error";
import NotFoundPage from "@/pages/404";

(window as any).redirect = redirect;

const v1: RouteObject[] = [
  {
    path: "/",
    errorElement: <ErrorPage />,
    element: <RootLayout />,
    children: [
      {
        path: "adilgarden",
        lazy: async () => import("@/pages/Public"),
      },
      {
        path: "adilraid",
        lazy: async () => import("@/pages/Personal"),
      },
    ],
  },
  { path: "*", element: <NotFoundPage /> },
];

const routerConfig = { v1 };

export default routerConfig;
