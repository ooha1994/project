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
const LocationsComponent = () => {
  const [formData, setFormData] = useState({});
  const [addFormData, setAddFormData] = useState({});
  const userId = localStorage.getItem("user");
  const [currentPage, setCurrentPage] = useState(1);
  const [appointments, setAppointmentData] = useState([]);
  let [serviceCodes, setServiceCodes] = useState([]);
  let [addServDisabled, setAddServDisabled] = useState(true);
  let [sCodeError, setSCodeError] = useState("");
  let [modDesc, setModDesc] = useState("");
  let [sDescError, setSDescError] = useState("");
  let [modDsc, setModDsc] = useState("");
  let [modCde, setModCde] = useState("");
  let [locationCodes, setLocationCodes] = useState([]);
  //let [locationCode, setLocationCode] = useState("");
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };

  function fetchServiceCodes() {
    try {
      fetch("http://localhost:9095/simplybook/servicesA", requestOptions)
        .then((response) => response.json())
        .then((data) => {
          if (!data.error) setServiceCodes(data);
        });
    } catch (err) {
      console.log(err);
    }
  }
  function fetchLocationCodes() {
    try {
      if (formData?.serviceCode != "" && formData?.serviceCode !== undefined)
        fetch(
          "http://localhost:9095/simplybook/serviceA/" +
            formData.serviceCode +
            "/locations",
          requestOptions
        )
          .then((response) => response.json())
          .then((data) => {
            setLocationCodes(data);
          });
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    fetchServiceCodes();
  }, [""]);
  const handleChange = ({ target }) => {
    setFormData({ ...formData, [target.name]: target.value });
    formData.sCode = "";
    formData.sDesc = "";
    fetchLocationCodes();
  };
  const handleAdd = ({ target }) => {
    validateAddForm();
    setAddFormData({ ...addFormData, [target.name]: target.value });
  };
  // const modData = ({ target, item }) => {
  //   setModDsc(target.value);
  //   setModCde(item.code);
  //   setModDsc(item.description);
  // };
  const editOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      locationCode: modCde,
      locationDesc: modDsc,
    }),
  };
  // const changeLocation = ({}) => {
  //   try {
  //     fetch("http://localhost:9095/simplybook/location/edit", editOptions)
  //       .then((response) => response.json())
  //       .then((data) => {
  //         fetchLocationCodes();
  //         setAddFormData({});
  //       });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const validateAddForm = () => {
    const { sCode, sDesc } = addFormData;
    setSCodeError("");
    setSDescError("");
    if (formData.serviceCode) {
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
      locationCode: addFormData.sCode?.toUpperCase(),
      locationDesc: addFormData.sDesc,
      reasonCode: formData.serviceCode,
      serviceCode: formData.serviceCode,
    }),
  };
  const addLocation = (evt) => {
    try {
      fetch("http://localhost:9095/simplybook/location", requestPostOptions)
        .then((response) => response.json())
        .then((data) => {
          fetchLocationCodes();
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
      (locationCodes && locationCodes.length === 0) ||
      locationCodes?.length === undefined
    ) {
    } else {
      console.log("NoError" + locationCodes.length);
      return locationCodes?.slice(firstPageIndex, lastPageIndex);
    }
  }, [currentPage, locationCodes]);

  return (
    <>
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>Locations</strong>
            </CCardHeader>
            <CCardBody>
              <CForm className="row g-3">
                <CCol md={6}>
                  <CFormLabel htmlFor="serviceCode">
                    Select the Service
                  </CFormLabel>
                  <CFormSelect
                    size="lg"
                    className="mb-3"
                    name="serviceCode"
                    onChange={handleChange}
                    onBlur={handleChange}
                    aria-label="Select Service"
                  >
                    <option value="">Open this select menu</option>
                    {Object.keys(serviceCodes).map((item) => {
                      return (
                        <option key={item} value={item}>
                          {serviceCodes[item]}
                        </option>
                      );
                    })}
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
                    onClick={addLocation}
                    disabled={addServDisabled}
                  >
                    Add Location
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
                            name={"editCode" + item.id}
                            //onChange={modData(item)}
                            //onBlur={modData(item)}
                            aria-label="Code"
                            value={modCde || item.code}
                            readOnly={true}
                          ></CFormInput>
                        </CTableDataCell>
                        <CTableDataCell>
                          <CFormInput
                            size="lg"
                            className="mb-3"
                            name={"editDesc" + item.id}
                            //onChange={modData(item)}
                            //onBlur={modData(item)}
                            aria-label="Description"
                            //value={item.description}
                            value={item.description || ""}
                            readOnly={true}
                          ></CFormInput>
                        </CTableDataCell>
                        {/* <CTableDataCell>
                          {" "}
                          <CButton
                            color="primary"
                            className="px-4"
                            onClick={changeLocation}
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
                totalCount={locationCodes.length || 0}
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
export default LocationsComponent;
