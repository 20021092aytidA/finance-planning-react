import Sidebar from "../components/sidebar/Sidebar";
import Footer from "../components/footer/Footer";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className="bg-amber-100 max-h-screen overflow-y-scroll w-full">
          <Outlet />
        </div>
      </div>
    </>
  );
}
