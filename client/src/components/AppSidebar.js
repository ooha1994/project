import React from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarToggler,
} from "@coreui/react";

import { AppSidebarNav } from "../components/AppSidebarNav";
import { CAvatar } from "@coreui/react";
import avatar from "../assets/images/avatars/user_logo.jpg";
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";
import CIcon from "@coreui/icons-react";
import {
  cibClockify,
  cilAddressBook,
  cilCalendarCheck,
  cilEnvelopeClosed,
  cilHome,
  cilHospital,
  cilList,
  cilUser,
} from "@coreui/icons";
import { CNavItem } from "@coreui/react";
// sidebar nav config
//import navigation from "../_nav";

const AppSidebar = ({ role }) => {
  const dispatch = useDispatch();
  const unfoldable = useSelector((state) => state.sidebarUnfoldable);
  const sidebarShow = useSelector((state) => state.sidebarShow);
  let _nav = [];
  if ("professor" === localStorage.getItem("level"))
    _nav = [
      {
        component: CNavItem,
        name: "Dashboard",
        to: "/landing/dashboardA",
        icon: <CIcon icon={cilHome} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: "Schedule",
        to: "/landing/bookingAppointment",
        icon: <CIcon icon={cilCalendarCheck} customClassName="nav-icon" />,
      },
      { 
        component: CNavItem,
        name: "View Schedules",
        to: "/landing/viewschedules",
        icon: <CIcon icon={cilList} customClassName="nav-icon" />,
      },     
      {
        component: CNavItem,
        name: "Appointments",
        to: "/landing/appointments",
        icon: <CIcon icon={cilList} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: "Profile",
        to: "/landing/profile",
        icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
      },
    ];
  else
    _nav = [
      {
        component: CNavItem,
        name: "Dashboard",
        to: "/landing/dashboard",
        icon: <CIcon icon={cilHome} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: "Booking",
        to: "/landing/bookingAppointment",
        icon: <CIcon icon={cilCalendarCheck} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: "Appointments",
        to: "/landing/appointments",
        icon: <CIcon icon={cilList} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: "Profile",
        to: "/landing/profile",
        icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
      },
    ];
  return (
    <CSidebar
      width="100%"
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch({ type: "set", sidebarShow: visible });
      }}
    >
      <CSidebarBrand className="d-none d-md-flex" to="/">
        <CAvatar src={avatar} size="lg" />
      </CSidebarBrand>
      <CSidebarNav>
        <SimpleBar>
          <AppSidebarNav items={_nav} />
        </SimpleBar>
      </CSidebarNav>
      <CSidebarToggler
        className="d-none d-lg-flex"
        onClick={() =>
          dispatch({ type: "set", sidebarUnfoldable: !unfoldable })
        }
      />
    </CSidebar>
  );
};

export default React.memo(AppSidebar);
