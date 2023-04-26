import React from "react";
import './ViewSchedule.css'
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
const ViewSchedules = () => {
  const userId = localStorage.getItem("user");
  const [currentPage, setCurrentPage] = useState(1);
  const [appointments, setAppointmentData] = useState([]);
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
    fetch("http://localhost:4000/api/getschduledappointments", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log("data",data);
        if(data.length>0){
            setAppointmentData(data);
          }
        else{

        }
        // if(data.studentappointments){
        //   setStudentAppointmentData(data.studentappointments);
        // }
        // if(data.professorappointments){
        //   setProfessorAppointmentData(data.professorappointments);
        // }
        
        
      });
  }
  useEffect(() => {
    fetchData();
  }, [""]);
  const handleClick = (param) => {
    setShowTextMessage(prevState => ({
      ...prevState,
      [param.scheduleid]: true
    }));
  
      fetch("http://localhost:4000/api/closeschedule", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            scheduleid: param.scheduleid
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("data",data);
          
        });
    }


    return (
        <>
            <div>
            <strong>Scheduled Appointments</strong><br></br><br></br>
            <table> 
            <thead>
            <tr>  
                    <th>Schedule ID</th>
                    <th>Name</th>
                    <th>Date</th>
                    <th>Start Time</th>
                    <th>End Time</th>
                    <th>Message</th>
                    <th>Status</th>
                    <th>Close Schedule</th>

                    </tr>
            </thead>
        <tbody>
            {appointments.map(info => (
            <tr key={info.id}>
                <td>{info.scheduleid}</td>
                <td>{info.name}</td>
                <td>{info.date}</td>
                <td>{info.starttime}</td>
                <td>{info.endtime}</td>
                <td>{info.message}</td>
                <td>
            {showTextMessage[info.scheduleid] ? (
                    <p style={{ color: 'red'}}>Closed</p>
                  ) : (
                    <p>{info.status}</p>
                  )}
            </td>
                {/* <td>{info.status}</td> */}
                <td>
                {showTextMessage[info.scheduleid]
        ? <p class="color">Schedule closed!!</p>
        : info.status=="closed"
          ? <p>Schedule closed!!</p>
          :           <CButton
          color="primary"
          className="px-4"
          onClick={() => handleClick(info)}
          // onClick={handleSubmit}
          disabled={false}
        >
          Close Schedule
        </CButton>
      } 
                </td>
            </tr>
            ))}
        </tbody>
        </table>
            
        </div>
      </>
    )
};
export default ViewSchedules;
