import './TypeAheadDropDown.css'
import React from 'react';
import {
  CButton
} from "@coreui/react";

export default class TypeAheadDropDown extends React.Component {
 constructor(props) {
   super(props);
   this.state = {
     suggestions: [],
     text:'',
     data: [],
     error: '',
     clickedRows: {},
     showTextMessage: {}
   }
   this.handleButtonClick = this.handleButtonClick.bind(this);
 }
 
 onTextChange = (e) => {
   const {iteams} = this.props;
   let suggestions = [];
   const value = e.target.value;
   if (value.length > 0) {
     const regex = new RegExp(`^${value}`, `i`);
     suggestions = iteams.sort().filter(v => regex.test(v));
   }


   this.setState(() => ({
     suggestions,
     text:value
   }));
 }
 suggestionSelected=(value)=>{
    this.setState(()=>({
      text:value,
      suggestions:[]
    }))
  }
  renderSuggestions = () => {
    const { suggestions } = this.state;
    if (suggestions.length === 0) {
      return null;
    }
    return (
      <ul>
        {suggestions.map(city => <li key={city} onClick={(e)=>this.suggestionSelected(city)}>{city}</li>)}
      </ul>
    )
  }
  fetchData() {
    console.log("On fetch data")
    console.log("text data",this.state.text)
    const url = 'http://localhost:4000/api/test';
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        professor: this.state.text
      })
    };
    fetch(url, options)
    .then(response => response.json())
    .then(data => {
      console.log("data",data)
      const dataWithId = data.map((item, index) => {
        return { ...item, id: index + 1 };
      });
      this.setState({ data: dataWithId });
    })
    console.log("data",this.state.data)
      .catch(error => console.log(error));
  }
  handleSubmit(messageId) {
    console.log("messageId",messageId)
  }
  handleButtonClick(messageId) {
    console.log("messageId",messageId)
    this.setState(prevState => ({
      showTextMessage: {
        ...prevState.showTextMessage,
        [messageId.id]: true
      }
    }));
    console.log("showTextMessage",this.state.showTextMessage)
    const url = 'http://localhost:4000/api/bookappointment';
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        studentname:localStorage.getItem("firstname")+" "+localStorage.getItem("lastname"),
        professorname:messageId.name,
        date: messageId.date,
        starttime:messageId.starttime,
        endtime: messageId.endtime,
        message:messageId.message,
        status:"open"
      })
    };
    try{
      fetch(url, options)
      .then(response => response.json())
      .then(data => {
        console.log("data",data)
      })

    } catch (err) {
      console.log(err);
    }
    
  }
  
  
  render() {
    const {text,data,showTextMessage}=this.state;
    return (
      <>
      <div class="typeaheadbody">
        <div className="TypeAheadDropDown inline-block-child">
          <input onChange={this.onTextChange} placeholder="Search Professor name" value={text} type="text" />
          {this.renderSuggestions()}
        </div>
        <button 
        class="form-submit-button inline-block-child"
        onClick={() => this.fetchData()}
        >submit</button>
      </div>
        <div>
      <table>
        <thead>
          <tr>
            <th>Professor Name</th>
            <th>Date</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Message</th>
            <th>Book Apoointment</th>
          </tr>
        </thead>
        <tbody>
          {data.map(item => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.date}</td>
              <td>{item.starttime}</td>
              <td>{item.endtime}</td>
              <td>{item.message}</td>
               <td>
              {showTextMessage[item.id] ? (
                    <p class="color">Appointment Booked!!</p>
                  ) : (
                    <CButton
                    color="primary"
                    className="px-4"
                    onClick={() => this.handleButtonClick(item)}
                    // onClick={handleSubmit}
                    disabled={false}
                  >
                    Book Appointment
                  </CButton>
                  )}
                </td> 
              {/* {this.state.showMessage ? (s
                  <p>Appointment Booked</p>
                ) : (
                  <CButton
                  color="primary"
                  className="px-4"
                  onClick={() => this.handleSubmit(item)}
                  // onClick={handleSubmit}
                  disabled={false}
                >
                  Book Appointment
                </CButton>
                )} */}
              {/* </td> */}
              {/* <td>
                {clickedRows[item.id] ? (
                  <div>Appointment Booked!! {item.id}</div>
                ) : (
                  <button onClick={() => this.handleSubmit(item)}>
                    Click me
                  </button>
                )}
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </>
    );
  }
  
 } 