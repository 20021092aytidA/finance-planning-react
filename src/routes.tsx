import DashboardPage from "./components/dashboard/DashboardPage";
import LoginPage from "./components/login/LoginPage";
import PageNotFound from "./components/pageNotFound/PageNotFound";
import RegisterPage from "./components/register/RegisterPage";

export type RouteType = {
  link: string;
  component: React.ReactNode;
};

export const noNavFootRoutes: RouteType[] = [
  {
    link: "*",
    component: <PageNotFound />,
  },
  {
    link: "/register",
    component: <RegisterPage />,
  },
  {
    link: "/login",
    component: <LoginPage />,
  },
];

export const routes: RouteType[] = [
  {
    link: "/dashboard",
    component: <DashboardPage />,
  },
];
