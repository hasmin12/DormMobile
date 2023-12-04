
import React from "react";
import { useSelector } from "react-redux";
import UserNavigator from "./UserNavigator";
import ResidentNavigator from "./ResidentNavigator";
import AdminNavigator from "./AdminNavigator";

const Main = () => {
  const user = useSelector((state) => state.auth);
 
  return (
    <>
      {user.isAuthenticated ? (
        user.user.user.role=== "Resident" ? (
          <ResidentNavigator />
        ) : (
          <AdminNavigator />
        )
      ) : (
        <UserNavigator />
      )}
    </>
  );
};

export default Main;