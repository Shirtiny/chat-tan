import { createBrowserRouter, RouterProvider } from "react-router-dom";
import routerConfig from "./config";

const router = createBrowserRouter(routerConfig.v1);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
