import Sidebar from "../components/sidebar/Sidebar";
import Footer from "../components/footer/Footer";
import { Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import { logOutUser } from "../api/user/userRequests";

export default function MainLayout() {
  const navigate = useNavigate();
  const [isLogOut, setIsLogOut] = useState<boolean>(false);
  const logOut = async (
    e: React.MouseEvent<HTMLButtonElement>,
  ): Promise<void> => {
    e.preventDefault();
    setIsLogOut(true);

    const id = sessionStorage.getItem("userID");
    if (id) {
      try {
        const res = await logOutUser(id);
        if (res.status === 200) {
          sessionStorage.clear();
          navigate("/login");
          return;
        }

        alert(`log out failed: ${res.resMsg}`);
      } catch (error) {
        alert(`log out failed: ${error}`);
      } finally {
        setIsLogOut(false);
      }
    }

    navigate("/login");
    setIsLogOut(false);
  };

  return (
    <>
      {isLogOut ? (
        <div className="z-1 flex justify-center items-center fixed h-screen w-screen text-md text-white bg-[rgba(0,0,0,0.5)]">
          Logging out..
        </div>
      ) : null}

      <div className="flex">
        <Sidebar />
        <div className="p-2 max-h-screen overflow-y-scroll w-full bg-gray-100">
          <Outlet />
        </div>
        <div className="absolute bottom-5 right-5">
          <button
            onClick={logOut}
            className="p-2 bg-gray-700 text-sm text-white font-semibold rounded-sm cursor-pointer hover:underline"
          >
            Log out
          </button>
        </div>
      </div>
    </>
  );
}
