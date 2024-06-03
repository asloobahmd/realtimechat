import React, { useContext } from "react";
import { Button } from "./ui/button";
import { AuthContext } from "@/context/AuthContext";

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);

  const handleLogout = async () => {
    await logout();
  };

  return (
    <nav className="bg-blue-950 w-full text-white flex items-center justify-between h-[80px] ">
      <div className="container p-3 w-full flex justify-between items-center">
        <h1 className="text-3xl font-semibold">LOGO</h1>
        <div className="flex items-center gap-4">
          <span>{currentUser?.username}</span>
          <Button
            type="submit"
            className="w-full text-white bg-black hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
