import { lazy } from "react";
import { Redirect } from "react-router-dom";
// layouts
import HomeLayout from "../layouts/home";
import MainLayout from "../layouts/docs";
import { PATH_PAGE, PATH_AUTH, PATH_DASHBOARD } from "./paths";

// ----------------------------------------------------------------------

const HomeRoutes = {
  path: "*",
  routes: [
    {
      exact: true,
      path: "/",
      component: lazy(() => import("../layouts/docs")),
    },
    // {
    //   exact: true,
    //   path: "/components",
    //   component: lazy(() => import("../views/ComponentsOverview")),
    // },

    // ----------------------------------------------------------------------

    {
      component: () => <Redirect to="/404" />,
    },
  ],
};

export default HomeRoutes;
