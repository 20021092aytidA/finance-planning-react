import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { noNavFootRoutes, routes, RouteType } from "./routes";
import "./App.css";
import MainLayout from "./layout/MainLayout";

function App(): React.ReactNode {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />

          {noNavFootRoutes.map((route: RouteType) => {
            return <Route element={route.component} path={route.link} />;
          })}

          <Route element={<MainLayout />}>
            {routes.map((route: RouteType) => {
              return <Route element={route.component} path={route.link} />;
            })}
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
