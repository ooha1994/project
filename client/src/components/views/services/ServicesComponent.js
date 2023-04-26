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
const ServicesComponent = () => {
  const [formData, setFormData] = useState({});
  const [addFormData, setAddFormData] = useState({});
  const userId = localStorage.getItem("user");
  const [currentPage, setCurrentPage] = useState(1);
  const [appointments, setAppointmentData] = useState([]);
  let [serviceCodes, setServiceCodes] = useState([]);
  let [addServDisabled, setAddServDisabled] = useState(true);
  let [sCodeError, setSCodeError] = useState("");
  let [sDescError, setSDescError] = useState("");
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };

  function fetchServiceCodes() {
    try {
      if (formData?.reasonCode != "" && formData?.reasonCode !== undefined)
        fetch(
          "http://localhost:9095/simplybook/services/" + formData.reasonCode,
          requestOptions
        )
          .then((response) => response.json())
          .then((data) => {
            if (!data.error) setServiceCodes(data);
          });
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    if (formData.reasonCode != "" && formData?.reasonCode !== undefined)
      fetchServiceCodes();
  }, [formData.reasonCode]);

  const handleChange = ({ target }) => {
    setFormData({ ...formData, [target.name]: target.value });
    formData.sCode = "";
    formData.sDesc = "";
    fetchServiceCodes();
  };
  const handleAdd = ({ target }) => {
    validateAddForm();
    setAddFormData({ ...addFormData, [target.name]: target.value });
  };
  const validateAddForm = () => {
    const { sCode, sDesc } = addFormData;
    setSCodeError("");
    setSDescError("");
    if (formData.reasonCode) {
      if (!sCode) {
        setSCodeError("Code is required");
      } else if (sCode.length < 3) {
        setSCodeError("Code length should more than 3 characters");
      } else {
        setSCodeError("");
      }
      if (!sDesc) {
        setSDescError("Description is required");
      } else if (sDesc.length < 3) {
        setSDescError("Description should more than 3 characters");
      } else {
        setSDescError("");
      }

      if (sCodeError === "" && sDescError === "") {
        setAddServDisabled(false);
      }
    }
  };
  const requestPostOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      serviceCode: addFormData.sCode?.toUpperCase(),
      serviceDesc: addFormData.sDesc,
      reasonCode: formData.reasonCode,
    }),
  };
  const addService = (evt) => {
    try {
      fetch("http://localhost:9095/simplybook/service", requestPostOptions)
        .then((response) => response.json())
        .then((data) => {
          fetchServiceCodes();
          setAddFormData({});
        });
    } catch (err) {
      console.log(err);
    }
  };
  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return serviceCodes.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, serviceCodes]);

  return (
    <>
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>Services</strong>
            </CCardHeader>
            <CCardBody>
              <CForm className="row g-3">
                <CCol md={6}>
                  <CFormLabel htmlFor="reasonCode">
                    Select the Reason
                  </CFormLabel>
                  <CFormSelect
                    size="lg"
                    className="mb-3"
                    name="reasonCode"
                    onChange={handleChange}
                    onBlur={handleChange}
                    aria-label="Select Reason"
                  >
                    <option value="">Open this select menu</option>
                    <option value="HOSPITAL">Hospital</option>
                    <option value="BANK">Bank</option>
                  </CFormSelect>
                </CCol>
              </CForm>
              <CForm className="row g-3">
                <CCol md={6}>
                  <CFormLabel htmlFor="sCode">Code</CFormLabel>
                  <CFormInput
                    size="lg"
                    className="mb-3"
                    name="sCode"
                    onChange={handleAdd}
                    onBlur={handleAdd}
                    aria-label="Code"
                  ></CFormInput>
                  <Form.Text style={{ color: "red" }}>{sCodeError}</Form.Text>
                </CCol>
                <CCol md={6}>
                  <CFormLabel htmlFor="sDesc">Description</CFormLabel>
                  <CFormInput
                    size="lg"
                    className="mb-3"
                    name="sDesc"
                    onChange={handleAdd}
                    onBlur={handleAdd}
                    aria-label="Description"
                  ></CFormInput>
                  <Form.Text style={{ color: "red" }}>{sDescError}</Form.Text>
                </CCol>
                <CCol xs={12}>
                  <CButton
                    color="primary"
                    className="px-4"
                    onClick={addService}
                    disabled={addServDisabled}
                  >
                    Add Service
                  </CButton>
                </CCol>
              </CForm>
            </CCardBody>
            <CCardBody>
              <CTable hover>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell>Sl No</CTableHeaderCell>
                    <CTableHeaderCell>Code</CTableHeaderCell>
                    <CTableHeaderCell>Description</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {currentTableData?.map((item) => {
                    return (
                      <CTableRow key={item.id}>
                        <CTableDataCell>{item.id}</CTableDataCell>
                        <CTableDataCell>
                          {" "}
                          <CFormInput
                            size="lg"
                            className="mb-3"
                            name="editCode"
                            onChange={handleAdd}
                            onBlur={handleAdd}
                            aria-label="Code"
                            value={item.code}
                            readOnly={true}
                          ></CFormInput>
                        </CTableDataCell>
                        <CTableDataCell>
                          <CFormInput
                            size="lg"
                            className="mb-3"
                            name="editDesc"
                            onChange={handleAdd}
                            onBlur={handleAdd}
                            aria-label="Description"
                            value={item.description}
                            readOnly={true}
                          ></CFormInput>
                        </CTableDataCell>
                        {/* <CTableDataCell>
                          {" "}
                          <CButton
                            color="primary"
                            className="px-4"
                            onClick={addService}
                            disabled={false}
                          >
                            Edit
                          </CButton>
                        </CTableDataCell> */}
                      </CTableRow>
                    );
                  })}
                </CTableBody>
              </CTable>
              <Pagination
                className="pagination-bar"
                currentPage={currentPage}
                totalCount={serviceCodes.length}
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
export default ServicesComponent;
