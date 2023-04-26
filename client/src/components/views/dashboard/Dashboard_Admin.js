import React from "react";
import { CChartLine } from "@coreui/react-chartjs";
import CIcon from "@coreui/icons-react";
import { cilCalendar, cilHospital, cilAddressBook } from "@coreui/icons";
import { CCol, CRow, CWidgetStatsD, CNavLink } from "@coreui/react";
import { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  CButton
} from "@coreui/react";
const Dashboard_Admin = () => {
  let [appointmentsOpenCount, setAppointmentsOpenCount] = useState(0);
  let [appointmentsCloseCount, setAppointmentsCloseCount] = useState(0);
  const firstName = localStorage.getItem("firstname");
  const lastName = localStorage.getItem("lastname");
  let [openAppointments, setOpenAppointments] = useState({});
  let [closeAppointments, setCloseAppointments] = useState({});
  let [showClosedAppointments, setshowClosedAppointments] = useState(false);
  let [showOpenAppointments, setshowOpenAppointments] = useState(false);
  const [showTextMessage, setShowTextMessage] = useState({});
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: firstName +" "+ lastName,
      level:localStorage.getItem("level")
    }),

  };
  function fetchAppointments() {
    console.log("in fetchAppointments")
    fetch(
      "http://localhost:4000/api/getappointmentcount",
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("data",data)
        if(data.professorcloseapoointments.length>0){
          console.log("professorcloseapoointments greater than zero")
          setAppointmentsCloseCount(data.professorcloseapoointments.length);
          setCloseAppointments(data.professorcloseapoointments)
        }
        else{
          setAppointmentsCloseCount(0);
        }
        
        if(data.professoropenappointments.length>0){
          console.log("setAppointmentsOpenCount greater than zero")
          setOpenAppointments(data.professoropenappointments)
          setAppointmentsOpenCount(data.professoropenappointments.length);
        }
        else{
          setAppointmentsOpenCount(0);
        }
        

        // if (data?.error === undefined) {
          

        // } else 
              
      });
      console.log("appointmentsOpenCount",appointmentsOpenCount)
  }
  useEffect(() => {
    fetchAppointments();
  }, [""]);
  function handleClickClose(message) {
    setshowOpenAppointments(false)
    setshowClosedAppointments(true)
  }
  function handleClickOpen(message) {
    setshowClosedAppointments(false)
    setshowOpenAppointments(true)
    
  }
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
  console.log("openAppointments",openAppointments)
  return (
    <>
      <CRow>
        <CCol xs={3}>
          <CWidgetStatsD
            className="mb-3"
            icon={
              <CIcon
                className="my-4 text-white"
                icon={cilCalendar}
                height={52}
              />
            }
            chart={
              <CChartLine
                className="position-absolute w-100 h-100"
                data={{
                  labels: [
                    "January",
                    "February",
                    "March",
                    "April",
                    "May",
                    "June",
                    "July",
                  ],
                  datasets: [
                    {
                      backgroundColor: "rgba(255,255,255,.2)",
                      borderColor: "rgba(255,255,255,.55)",
                      pointHoverBackgroundColor: "#fff",
                      borderWidth: 2,
                      data: [65, 59, 84, 84, 51, 55, 40],
                      fill: true,
                    },
                  ],
                }}
                options={{
                  elements: {
                    line: {
                      tension: 0.4,
                    },
                    point: {
                      radius: 0,
                      hitRadius: 10,
                      hoverRadius: 4,
                      hoverBorderWidth: 3,
                    },
                  },
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      display: false,
                    },
                  },
                  scales: {
                    x: {
                      display: false,
                    },
                    y: {
                      display: false,
                    },
                  },
                }}
              />
            }
            style={{ "--cui-card-cap-bg": "#ff4500" }}
            values={[
              {
                title: "Open Appointments",
                value: <a href="#" onClick={handleClickOpen}>{appointmentsOpenCount}</a>
                // value: <a href="/landing/appointments">{appointmentsOpenCount}</a>,
              },
            ]}
          />
        </CCol>
        <CCol xs={3}>
          <CWidgetStatsD
            className="mb-3"
            icon={
              <CIcon
                className="my-4 text-white"
                icon={cilCalendar}
                height={52}
              />
            }
            chart={
              <CChartLine
                className="position-absolute w-100 h-100"
                data={{
                  labels: [
                    "January",
                    "February",
                    "March",
                    "April",
                    "May",
                    "June",
                    "July",
                  ],
                  datasets: [
                    {
                      backgroundColor: "rgba(255,255,255,.2)",
                      borderColor: "rgba(255,255,255,.55)",
                      pointHoverBackgroundColor: "#fff",
                      borderWidth: 2,
                      data: [65, 59, 84, 84, 51, 55, 40],
                      fill: true,
                    },
                  ],
                }}
                options={{
                  elements: {
                    line: {
                      tension: 0.4,
                    },
                    point: {
                      radius: 0,
                      hitRadius: 10,
                      hoverRadius: 4,
                      hoverBorderWidth: 3,
                    },
                  },
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      display: false,
                    },
                  },
                  scales: {
                    x: {
                      display: false,
                    },
                    y: {
                      display: false,
                    },
                  },
                }}
              />
            }
            style={{ "--cui-card-cap-bg": "#ff4500" }}
            values={[
              {
                title: "CLOSED APPOINTMENTS",
                // value: <p onClick={() => setShowData}>{appointmentsCloseCount}</p>
                // value: <a href="/landing/appointments">{appointmentsCloseCount}</a>,
                value: <a href="#" onClick={handleClickClose}>{appointmentsCloseCount}</a>,
            
              },
            ]}
          />
        </CCol>

      </CRow>
      {showOpenAppointments && (
        <>
        <h1>Open Appointments</h1>
        <br></br>
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
            {openAppointments.map(info => (
              <tr key={info.id}>
                <td>{info.boookingid}</td>
                <td>{info.studentname}</td>
                <td>{info.date}</td>
                <td>{info.starttime}</td>
                <td>{info.endtime}</td>
                <th>{info.message}</th>
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
        </>
      )}
        {showClosedAppointments && (
        <>
        <h1>Closed Appointments</h1>
        <br></br>
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

                      </tr>
              </thead>
          <tbody>
            {closeAppointments.map(info => (
              <tr key={info.id}>
                <td>{info.boookingid}</td>
                <td>{info.studentname}</td>
                <td>{info.date}</td>
                <td>{info.starttime}</td>
                <td>{info.endtime}</td>
                <td>{info.message}</td>
                <td>{info.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </>
      )}
        
    </>
  );

};

export default Dashboard_Admin;
