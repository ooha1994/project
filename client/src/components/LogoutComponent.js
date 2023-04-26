import React from "react";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CAlert, CAlertHeading } from "@coreui/react";
const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  dispatch({
    type: "set",
    headerbarShow: "none",
  });
  useEffect(() => {
    localStorage.removeItem("firstName");
    localStorage.removeItem("lastName");
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    navigate("/home", { replace: true }, {});
  }, [""]);
  return <></>;
};

export default Logout;
