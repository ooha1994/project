import React from "react";
import {
  AppContent,
  AppSidebar,
  AppFooter,
  AppHeader,
} from "../../components/index";
import { useDispatch } from "react-redux";

const DefaultLayout = () => {
  const dispatch = useDispatch();
  dispatch({
    type: "set",
    headerbarShow: "none",
  });

  return (
    <div>
      <AppSidebar role={localStorage.getItem("role")} />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader />
        <div className="body flex-grow-1 px-3">
          <AppContent />
        </div>
        <AppFooter />
      </div>
    </div>
  );
};

export default DefaultLayout;
