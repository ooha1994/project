import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  CContainer,
  CHeader,
  CHeaderDivider,
  CHeaderToggler,
  CNavLink,
  CAlert,
  CBadge,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilMenu, cilPowerStandby } from "@coreui/icons";
import { AppBreadcrumb } from "./index";
const AppHeader = () => {
  const dispatch = useDispatch();
  const sidebarShow = useSelector((state) => state.sidebarShow);
  const firstName = localStorage.getItem("firstname");
  const lastName = localStorage.getItem("lastname");

  return (
    <CHeader position="sticky" className="mb-4">
      <CContainer fluid>
        <CHeaderToggler
          className="ps-1"
          onClick={() =>
            dispatch({
              type: "set",
              sidebarShow: !sidebarShow,
            })
          }
        >
          <div className="d-flex align-items-center">
            <CIcon icon={cilMenu} size="xl" dark="true" />
            <CAlert color="white" className="d-flex align-items-center">
              <div>
                Welcome {firstName?.toUpperCase()} {lastName?.toUpperCase()} !!
              </div>
            </CAlert>
            {localStorage.getItem("role") === "ADMIN" ? (
              <CBadge color="warning">{localStorage.getItem("role")}</CBadge>
            ) : (
              <CBadge color="primary">{localStorage.getItem("role")}</CBadge>
            )}
            <CNavLink href="/logout" className="navlink">
              Logout
              <CIcon
                icon={cilPowerStandby}
                customClassName="header-img"
                size="lg"
              />
            </CNavLink>
          </div>
        </CHeaderToggler>
      </CContainer>
      <CHeaderDivider />
      <CContainer fluid>
        <AppBreadcrumb />
      </CContainer>
    </CHeader>
  );
};

export default AppHeader;
