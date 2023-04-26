import React from "react";
import cities from './cities.js';
import TypeAheadDropDown from './TypeAheadDropDown';
import './BookAppointment.css';
import displayTable from './displayTable';
import JsonData from './data.json';
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CRow,
  CFormTextarea
} from "@coreui/react";
// import { CTextarea } from '@coreui/coreui'
import moment from "moment";

import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import DatePicker from "react-date-picker";
import Form from "react-bootstrap/Form";

const BookAppointment = (props) => {
  const [dateValue, setDateValue] = useState(new Date());
  const [formData, setFormData] = useState({});
  const [message, setMessage] = useState("");
  let [startTimeError, setStartTimeError] = useState("");
  let [endTimeError, setEndTimeError] = useState("");
  let [disable, setDisable] = useState(true);
  const [professorNames, setProfessorsNames] = useState([]);
  const firstName = localStorage.getItem("firstname");
  const lastName = localStorage.getItem("lastname");

  const dateOnChange = (stat) => {
    
    setDateValue(stat);
    dateValue.setHours(12);
    dateValue.setMinutes(30);
    dateValue.setSeconds(0);
    setFormData({ ...formData, ['date']: dateValue });

  };
  const validateForm = () => {
    setStartTimeError("");
    setEndTimeError("");
    if(formData.starttime == ""){
      setDisable(false);
      setStartTimeError("starttime is required");
    }
    if(formData.endtime == ""){
      setDisable(false);
      setEndTimeError("endtime is required");
    }


  };
  const handleChange = ({ target }) => {
    setFormData({ ...formData, [target.name]: target.value });
    validateForm();
  };
  console.log("formData",formData)
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  };
  useEffect(() => {
    if(localStorage.getItem("level") == "student"){
      try {
        // console.log("fetch data")
        fetch(
          "http://localhost:4000/api/getprofessors",
          requestOptions
        )
        // fetch("http://localhost:4000/api/getprofessors", requestOptions)
          .then((response) => response.json())
          .then((data) => {
            setProfessorsNames(data);
          });
      } catch (err) {
        console.log(err);
      }

    }

  },);

 
  // let timeRangeArr = [];
  // function fetchTimeRanges() {
  //   try {
  //     if (formData?.locationCode != "" && formData?.locationCode !== undefined)
  //       fetch(
  //         "http://localhost:9095/simplybook/timeranges/" +
  //           formData.locationCode,
  //         requestOptions
  //       )
  //         .then((response) => response.json())
  //         .then((data) => {
  //           if (!data.error)
  //             Object.entries(data).forEach(([key, value]) => {
  //               timeRangeArr.push(key + " " + value);
  //             });
  //           setTimeRanges(timeRangeArr);
  //         });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }
  // function fetchServiceCodes() {
  //   try {
  //     if (formData?.reasonCode != "" && formData?.reasonCode !== undefined)
  //       fetch(
  //         "http://localhost:9095/simplybook/servicesA/" + formData.reasonCode,
  //         requestOptions
  //       )
  //         .then((response) => response.json())
  //         .then((data) => {
  //           if (!data.error) setServiceCodes(data);
  //         });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }
  // function fetchLocationCodes() {
  //   try {
  //     if (formData?.serviceCode != "" && formData?.serviceCode !== undefined)
  //       fetch(
  //         "http://localhost:9095/simplybook/service/" +
  //           formData.serviceCode +
  //           "/locations",
  //         requestOptions
  //       )
  //         .then((response) => response.json())
  //         .then((data) => {
  //           if (!data.error) setLocationCodes(data);
  //         });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }
  useEffect(() => {
    //fetchData();
  }, [""]);
  const navigate = useNavigate();
  const requestPostOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: firstName +" "+ lastName,
      date: dateValue.toISOString(),
      // date: formData.date,
      // date: new Date(formData.date).toISOString(),
      starttime: formData.starttime,
      endtime: formData.endtime,
      status:'open',
      message:formData.message,
    }),
  };
  // const handleSubmit =  () => {
  //   console.log("In handleSubmit")
  //   try {
  //     fetch(
  //       "http://localhost:4000//api/newschedules",
  //       requestPostOptions
  //     ).then((response) => response.json())
  //   } catch (err) {
  //     console.log(err);
  //   }
  
  // };
  const handleSubmit = async (evt) => {
    validateForm();

    try {
      fetch("http://localhost:4000/api/newschedules", requestPostOptions)
        .then((response) => response.json())
        .then((data) => { 
          if (data.message === "New schedule registered") {
            setMessage("New schedule registered")
          } else {
            setMessage("Error Occuured")
          }
        });
    } catch (err) {
      console.log(err);
    }
  };

const DisplayData=JsonData.map(
  (info)=>{
      return(
          <tr>
              <td>{info.id}</td>
              <td>{info.name}</td>
              <td>{info.city}</td>
          </tr>
      )
  }
)
if ("professor" === localStorage.getItem("level")){
  return (
    <>
    <CRow>
        <CFormLabel htmlFor="appointmentDateTime">
          Pick the Date & Time slot
        </CFormLabel>
        <DatePicker
            name="date"
            onChange={dateOnChange}

            value={dateValue}
            minDate={new Date()}
            onKeyDown={(e) => {
            e.preventDefault();
        }}
        />
    </CRow>
        <CFormLabel htmlFor="appointmentDateTime">
          Appointment start time
        </CFormLabel>
        <CFormInput
                          placeholder="Please mention AM/PM along with timezone"
                          name="starttime"
                          autoComplete="off"
                          value={formData.starttime || ""}
                          onChange={handleChange}
                          onBlur={handleChange}
                        />
                    <Form.Text style={{ color: "red" }}>
                      {startTimeError}
                    </Form.Text>
                <CFormLabel htmlFor="appointmentDateTime">
          Appointment end time
        </CFormLabel>
                    <CFormInput
                        placeholder="Please mention AM/PM along with timezone"
                        autoComplete="off"
                        name="endtime"
                        value={formData.endtime || ""}
                        onChange={handleChange}
                        onBlur={handleChange}
                      />
                    <Form.Text style={{ color: "red" }}>
                      {endTimeError}
                    </Form.Text>
                  <CFormLabel htmlFor="message">
          Message
        </CFormLabel>
        <CFormTextarea 
        placeholder="Enter some text here..."
        name="message"
        onChange={handleChange}
        value={formData.message || ""} rows={4} />
                        {/* <CTextarea 
                    name="message" 
                    id="textarea-input" 
                    rows="9"
                    placeholder="Type your message here..." 
                    onChange={handleChange}
                      /> */}
                      <br></br>
                  <CButton
                    color="primary"
                    className="px-4"
                    onClick={handleSubmit}
                    disabled={false}
                  >
                    Schedule Appointment
                  </CButton>
                  <Form.Text style={{ color: "red" }}>
                      {message}
                    </Form.Text>
    
    </>
  );
}
else{
  return(
    <>
    <div class="search">
      <p>Search Professor: </p>  
      <TypeAheadDropDown iteams={professorNames} /><br></br><br></br>

    </div>
    </>
  )
}

};

export default BookAppointment;
