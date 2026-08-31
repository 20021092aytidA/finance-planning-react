import { BrowserRouter, Route, Routes } from "react-router-dom";
import { noNavFootRoutes, routes, RouteType } from "./routes";
import "./App.css";
import Footer from "./components/footer/Footer";
import MainLayout from "./layout/MainLayout";

function App(): React.ReactNode {
  return (
    <>
      <BrowserRouter>
        <Routes>
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
