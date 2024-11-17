/* eslint-disable react/prop-types */
import { useState } from "react";
import NavBar from "src/Components/Navbar";
import LeftNavbar from "src/Components/LeftNavbar";

const HomePage = ({ user, setUser, notificationApi }) => {
  const [logoutLoading, setLogoutLoading] = useState(false);
  const handleLogout = async () => {
    setLogoutLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setUser(["username"], null);
    setUser(["name"], null);
    setUser(["password"], null);
    setUser(["isUserAvailable"], false);
    notificationApi.success({
      message: "Logout successful",
    });
    setLogoutLoading(false);
  };

  return (
    <>
      <NavBar name={user.name} handleLogout={handleLogout} logoutLoading={logoutLoading} />
      <LeftNavbar userName={user.name} />
    </>
  );
};

export default HomePage;
