import type { RouteObject } from "react-router-dom";
import type { INavItem } from "./type";
import RootLayout from "@/layouts/Root/index";
import ErrorPage from "@/pages/Error";
import NotFoundPage from "@/pages/404";

import { HiOutlineUser, HiOutlineChatBubbleLeftEllipsis } from "react-icons/hi2";

const navItems: INavItem[] = [
  {
    path: "adilgarden",
    lazy: async () => import("@/pages/Public"),
    icon: <HiOutlineChatBubbleLeftEllipsis />,
  },
  {
    path: "adilraid",
    lazy: async () => import("@/pages/Personal"),
    icon: <HiOutlineUser />,
  },
];

const v1: RouteObject[] = [
  {
    path: "/",
    errorElement: <ErrorPage />,
    element: <RootLayout />,
    children: navItems,
  },
  { path: "*", element: <NotFoundPage /> },
];

const routerConfig = { v1, navItems };

export default routerConfig;
