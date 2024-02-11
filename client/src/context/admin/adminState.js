import React, { useContext, useState, useEffect } from "react";
import adminContext from "./adminContext";

const AdminState = (props) => {
  const [adminId, setAdminId] = useState(() => {
    return localStorage.getItem("adminId") || null;
  });


  useEffect(() => {
    localStorage.setItem("adminId", adminId);
  }, [adminId]);

  return (
    <adminContext.Provider
      value={{
        adminId,
        setAdminId
      }}
    >
      {props.children} 
    </adminContext.Provider>
  );
};

export default AdminState;
