import React from "react";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableCaption,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CPagination,
  CPaginationItem,
} from "@coreui/react";
import { useState, useEffect, useMemo } from "react";
import Pagination from "../../Pagination";
let PageSize = 5;
const Messages = () => {
  const userId = localStorage.getItem("user");
  const [messages, setMessages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const greetingMsg = "Thanks for booking appointment";
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };

  function fetchData() {
    fetch(
      "http://localhost:9095/simplybook/user/" + userId + "/messages",
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        setMessages(data);
      });
  }
  useEffect(() => {
    fetchData();
  }, [""]);
  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return messages.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, messages]);

  if (messages.error != null) {
    return (
      <>
        <CRow>
          <CCol xs={12}>
            <CCard className="mb-4">
              <CCardHeader>
                <strong> No Messages</strong>
              </CCardHeader>
            </CCard>
          </CCol>
        </CRow>
      </>
    );
  } else {
    return (
      <>
        <CRow>
          <CCol xs={12}>
            <CCard className="mb-4">
              <CCardHeader>
                <strong>Received Messages</strong>
              </CCardHeader>
              <CCardBody>
                <CTable hover>
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell>Sl No</CTableHeaderCell>
                      <CTableHeaderCell>Message</CTableHeaderCell>
                      <CTableHeaderCell>Sent On</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {currentTableData?.map((item) => {
                      return (
                        <CTableRow key="{item.id}">
                          <CTableDataCell>{item.id}</CTableDataCell>
                          <CTableDataCell>
                            {greetingMsg}@{item.reason}@{item.serviceCode}@
                            {item.locationCode}
                          </CTableDataCell>
                          <CTableDataCell>{item.sent_on}</CTableDataCell>
                        </CTableRow>
                      );
                    })}
                  </CTableBody>
                </CTable>
                <Pagination
                  className="pagination-bar"
                  currentPage={currentPage}
                  totalCount={messages.length}
                  pageSize={PageSize}
                  onPageChange={(page) => setCurrentPage(page)}
                />
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </>
    );
  }
};
export default Messages;
