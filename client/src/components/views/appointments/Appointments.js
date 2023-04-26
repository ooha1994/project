import React from "react";
import JsonData from '../calendar/data.json';
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
  CButton
} from "@coreui/react";
import { useState, useEffect, useMemo } from "react";
import Pagination from "../../Pagination";
import moment from "moment";
let PageSize = 5;
const Appointments = () => {
  const userId = localStorage.getItem("user");
  const [currentPage, setCurrentPage] = useState(1);
  const [studentAppointments, setStudentAppointmentData] = useState([]);
  const [professorAppointments, setProfessorAppointmentData] = useState([]);
  const [showTextMessage, setShowTextMessage] = useState({});
  const firstName = localStorage.getItem("firstname");
  const lastName = localStorage.getItem("lastname");
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: firstName +" "+ lastName,
      level:localStorage.getItem("level")
    }),
  };

  function fetchData() {
    fetch("http://localhost:4000/api/getappointments", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log("data",data);
        if(data.studentappointments){
          setStudentAppointmentData(data.studentappointments);
        }
        if(data.professorappointments){
          setProfessorAppointmentData(data.professorappointments);
        }
        
        
      });
  }

  useEffect(() => {
    fetchData();
  }, [""]);

  const requestPOSTOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: firstName +" "+ lastName,
      level:localStorage.getItem("level")
    }),
  };

const handleClick = (param) => {
  setShowTextMessage(prevState => ({
    ...prevState,
    [param.boookingid]: true
  }));

    fetch("http://localhost:4000/api/closeappointments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        bookingid: param.boookingid
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("data",data);
        
      });
  }

  // const DisplayStudentData=studentAppointments.map(
  //   (info)=>{
  //       return(
  //           <tr>
  //               <td>{info.professorname}</td>
  //               <td>{info.date}</td>
  //               <td>{info.starttime}</td>
  //               <td>{info.endtime}</td>
  //               <td>{info.status}</td>
  //           </tr>
  //       )
  //   }
  // )

  // const currentTableData = useMemo(() => {
  //   const firstPageIndex = (currentPage - 1) * PageSize;
  //   const lastPageIndex = firstPageIndex + PageSize;
  //   if (
  //     (appointments && appointments.length === 0) ||
  //     appointments?.length === undefined
  //   ) {
  //   } else {
  //     return appointments.slice(firstPageIndex, lastPageIndex);
  //   }
  // }, [currentPage, appointments]);
  if (studentAppointments.length > 0 || professorAppointments.length >0 ) {
    return (
      <>             
      {studentAppointments.length > 0 ? (
            <div>
            <strong>Student Appointments</strong><br></br><br></br>
              <table> 
              <thead>
              <tr>  
                      <th>Booking ID</th>
                      <th>Professor Name</th>
                      <th>Date</th>
                      <th>Start Time</th>
                      <th>End Time</th>
                      <th>Message</th>
                      <th>Status</th>

                      </tr>
              </thead>
          <tbody>
            {studentAppointments.map(info => (
              <tr key={info.id}>
                <td>{info.boookingid}</td>
                <td>{info.professorname}</td>
                <td>{info.date}</td>
                <td>{info.starttime}</td>
                <td>{info.endtime}</td>
                <th>{info.message}</th>
                <td>{info.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
               
          </div>
        
      ) : (
        <div>
        <strong>Professor Appointments</strong><br></br><br></br>
          <table> 
          <thead>
          <tr>  
                  <th>Booking ID</th>
                  <th>Student Name</th>
                  <th>Date</th>
                  <th>Start Time</th>
                  <th>End Time</th>
                  <th>Message</th>
                  <th>Status</th>
                  <th>Close Appointment</th>
                  </tr>
          </thead>
      <tbody>
        {professorAppointments.map(info => (
          <tr key={info.id}>
            <td>{info.boookingid}</td>
            <td>{info.studentname}</td>
            <td>{info.date}</td>
            <td>{info.starttime}</td>
            <td>{info.endtime}</td>
            <td>{info.message}</td>
            <td>
            {showTextMessage[info.boookingid] ? (
                    <p>Closed</p>
                  ) : (
                    <p>{info.status}</p>
                  )}
            </td>
            <td>
            {showTextMessage[info.boookingid]
        ? <p class="color">Appointment closed!!</p>
        : info.status=="closed"
          ? <p>Appointment closed!!</p>
          :           <CButton
          color="primary"
          className="px-4"
          onClick={() => handleClick(info)}
          // onClick={handleSubmit}
          disabled={false}
        >
          close Appointment
        </CButton>
      }  
            </td>
          </tr>
        ))}
      </tbody>
    </table>
           
      </div>
      )}
        
    
      </>
    );
  }
  else {
    return (
      <>
        <CRow>
          <CCol xs={12}>
            <CCard className="mb-4">
              <CCardHeader>
                <strong> No Appointments</strong>
              </CCardHeader>
            </CCard>
          </CCol>
        </CRow>
      </>
    );
  }
};
export default Appointments;
