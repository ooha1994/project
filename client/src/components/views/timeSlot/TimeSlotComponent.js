import React from "react";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CBadge,
  CForm,
  CFormLabel,
  CFormSelect,
  CFormInput,
  CButton,
} from "@coreui/react";
import { useState, useEffect, useMemo } from "react";
import Pagination from "../../Pagination";
import moment from "moment";
import Form from "react-bootstrap/Form";
let PageSize = 5;
const TimeSlotComponent = () => {
  const [formData, setFormData] = useState({});
  const [addFormData, setAddFormData] = useState({});
  const userId = localStorage.getItem("user");
  const [currentPage, setCurrentPage] = useState(1);
  let [addServDisabled, setAddServDisabled] = useState(true);
  let [locationCodes, setLocationCodes] = useState([]);
  let [timeRanges, setTimeRanges] = useState([]);
  let [dupTimeSlots, setDupTimeSlots] = useState([]);
  //let [locationCode, setLocationCode] = useState("");
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };

  function fetchLocationCodes() {
    try {
      fetch("http://localhost:9095/simplybook/locationsA/", requestOptions)
        .then((response) => response.json())
        .then((data) => {
          setLocationCodes(data);
        });
    } catch (err) {
      console.log(err);
    }
  }
  function fetchTimeSlots() {
    let dupTimeSlotstemp = timeSlots;
    try {
      fetch(
        "http://localhost:9095/simplybook/timerangesA/" + formData.locationCode,
        requestOptions
      )
        .then((response) => response.json())
        .then((data) => {
          for (var i = 0; i < data.length; i++) {
            var arrlen = dupTimeSlotstemp.length;
            for (var j = 0; j < arrlen; j++) {
              if (data[i].timeRange + data[i].mode === dupTimeSlotstemp[j]) {
                dupTimeSlotstemp = dupTimeSlotstemp
                  .slice(0, j)
                  .concat(dupTimeSlotstemp.slice(j + 1, arrlen));
              }
            }
          }
          if (dupTimeSlotstemp?.length > 0) setAddServDisabled(false);
          setDupTimeSlots(dupTimeSlotstemp);
          setTimeRanges(data);
        });
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchLocationCodes();
  }, [""]);
  const handleChange = ({ target }) => {
    fetchTimeSlots();
    setFormData({ ...formData, [target.name]: target.value });
  };
  const handleAdd = ({ target }) => {
    // validateAddForm();
    setAddFormData({ ...addFormData, [target.name]: target.value });
  };
  //   const validateAddForm = () => {
  //     const { timeSlot } = addFormData;
  //     setSCodeError("");
  //     setSDescError("");
  //     if (formData.serviceCode) {
  //       if (!sCode) {
  //         setSCodeError("Code is required");
  //       } else if (sCode.length < 3) {
  //         setSCodeError("Code length should more than 3 characters");
  //       } else {
  //         setSCodeError("");
  //       }
  //       if (!sDesc) {
  //         setSDescError("Description is required");
  //       } else if (sDesc.length < 3) {
  //         setSDescError("Description should more than 3 characters");
  //       } else {
  //         setSDescError("");
  //       }

  //       if (sCodeError === "" && sDescError === "") {
  //         setAddServDisabled(false);
  //       }
  //     }
  //   };
  const requestPostOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      mode: addFormData.timeSlot?.slice(-2),
      timeRange: addFormData.timeSlot?.substring(
        0,
        addFormData.timeSlot?.length - 2
      ),
      locationCode: formData.locationCode,
    }),
  };
  const addTimeRange = (evt) => {
    try {
      fetch("http://localhost:9095/simplybook/timeRange", requestPostOptions)
        .then((response) => response.json())
        .then((data) => {
          fetchTimeSlots();
          setAddServDisabled(true);
          setAddFormData({});
        });
    } catch (err) {
      console.log(err);
    }
  };
  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    if (
      (timeRanges && timeRanges.length === 0) ||
      timeRanges?.length === undefined
    ) {
    } else {
      return timeRanges?.slice(firstPageIndex, lastPageIndex);
    }
  }, [currentPage, timeRanges]);
  const timeSlots = [
    "10:00 - 10:30AM",
    "11:00 - 11:30AM",
    "12:00 - 12:30PM",
    "01:00 - 01:30PM",
    "02:00 - 02:30PM",
    "03:00 - 03:30PM",
    "04:00 - 04:30PM",
  ];
  return (
    <>
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>Time Slots</strong>
            </CCardHeader>
            <CCardBody>
              <CForm className="row g-3">
                <CCol md={6}>
                  <CFormLabel htmlFor="locationCode">
                    Select the Location
                  </CFormLabel>
                  <CFormSelect
                    size="lg"
                    className="mb-3"
                    name="locationCode"
                    onChange={handleChange}
                    onBlur={handleChange}
                    aria-label="Select Location"
                  >
                    <option value="">Open this select menu</option>
                    {Object.keys(locationCodes).map((item) => {
                      return (
                        <option key={item} value={item}>
                          {locationCodes[item]}
                        </option>
                      );
                    })}
                  </CFormSelect>
                </CCol>
              </CForm>
              <CForm className="row g-3">
                <CCol md={6}>
                  <CFormLabel htmlFor="timeSlot">Select Time Slot</CFormLabel>
                  <CFormSelect
                    size="lg"
                    className="mb-3"
                    name="timeSlot"
                    onChange={handleAdd}
                    onBlur={handleAdd}
                    aria-label="Select Location"
                  >
                    <option value="">Open this select menu</option>
                    {Object.keys(dupTimeSlots).map((item) => {
                      return (
                        <option key={item} value={timeSlots[item]}>
                          {timeSlots[item]}
                        </option>
                      );
                    })}
                  </CFormSelect>
                </CCol>

                <CCol xs={12}>
                  <CButton
                    color="primary"
                    className="px-4"
                    onClick={addTimeRange}
                    disabled={addServDisabled}
                  >
                    Add Time Slot
                  </CButton>
                </CCol>
              </CForm>
            </CCardBody>
            <CCardBody>
              <CTable hover>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell>Sl No</CTableHeaderCell>
                    <CTableHeaderCell>Time Slots</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {currentTableData?.map((item) => {
                    return (
                      <CTableRow key={item.id}>
                        <CTableDataCell>{item.id}</CTableDataCell>
                        <CTableDataCell>
                          {item.timeRange}
                          {item.mode}
                        </CTableDataCell>
                      </CTableRow>
                    );
                  })}
                </CTableBody>
              </CTable>
              <Pagination
                className="pagination-bar"
                currentPage={currentPage}
                totalCount={timeRanges.length || 0}
                pageSize={PageSize}
                onPageChange={(page) => setCurrentPage(page)}
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};
export default TimeSlotComponent;
