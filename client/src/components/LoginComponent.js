import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginComponent.css";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
// import axios from "axios";
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilLockLocked, cilUser } from "@coreui/icons";
import { useEffect } from "react";
export default function LoginComponent(props) {
  const [formData, setFormData] = useState({});
  let [userNameError, setUserNameError] = useState("");
  let [passwordError, setPasswordError] = useState("");
  let [validUserError, setValidUserError] = useState("");
  let [disable, setDisable] = useState(true);
  const [loginStatus, setLoginStatus] = useState('');
  const navigate = useNavigate();
  const handleChange = ({ target }) => {
    setFormData({ ...formData, [target.name]: target.value });
    validateForm();
  };
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      emailaddress: formData.emailaddress,
      password: formData.password,
      // userRole: "USER",
    })
  };
  useEffect(() => {
    formData.emailaddress = "";
    formData.password = "";
    setUserNameError("");
    setPasswordError("");
  }, [""]);

  const handleSubmit = async (evt) => {
    validateForm();
    if (userNameError === "" && passwordError === "") {
      try {
        fetch(
          "http://localhost:4000/api/login",
          requestOptions
        )
          .then((response) => response.json())
          .then((data) => {
            if(data.message=="users exists"){
                localStorage.setItem("firstname", data.firstname);
                localStorage.setItem("lastname", data.lastname);
                localStorage.setItem("level", data.level);
                localStorage.setItem("email", data.email);
                if (data.level === "professor")
                navigate("/landing/dashboardA", { replace: true }, {});
              else navigate("/landing/dashboard", { replace: true }, {});
              }
              else{
                setValidUserError("User not found !!");
              }
          });
      } catch (err) {
        console.log(err);
      }
    } else {
      evt.preventDefault();
    }
  };
  const requestUserOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };
  function isValidEmail(val) {
    let regEmail =
    
      /^(([a-zA-Z0-9._%+-]+@ucmo\.edu))$/;
    if (!regEmail.test(val)) {
      return "Invalid Email Address";
    }
  }

  const validateForm = () => {
    const { emailaddress, password } = formData;
    setUserNameError("");
    setPasswordError("");
    setValidUserError("");
    if (!emailaddress) {
      setDisable(true)
      setUserNameError("Email Address is required");

    } else {
      setUserNameError(isValidEmail(emailaddress));
      setDisable(true)
      setUserNameError("");
    }
    if (!password) {
      setPasswordError("Password is required");
      setDisable(true)
    } else if (password.length < 6) {
      setDisable(true)
      setPasswordError("Password should be minimum 6 characters");
    } else if (password.indexOf(" ") >= 0) {
      setDisable(true)
      setPasswordError("Password cannot contain spaces");
    } else {
      setDisable(false)
      setPasswordError("");
    }

    if (userNameError === "" && passwordError === "") {
      setDisable(false);
    }
  };
  return (
    <>
      <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
        <CContainer className="containerCss login">
          <CRow className="justify-content-center">
            <CCol md={8}>
              <CForm>
                <CCardGroup>
                  <CCard className="p-4">
                    <CCardBody>
                      <h1>Login</h1>
                      <p className="text-medium-emphasis">
                        Sign In to your account
                      </p>
                      <CInputGroup className="mb-3">
                        <CInputGroupText>
                          <CIcon icon={cilUser} />
                        </CInputGroupText>
                        <CFormInput
                          placeholder="Emailadrress"
                          name="emailaddress"
                          autoComplete="off"
                          value={formData.emailaddress || ""}
                          onChange={handleChange}
                          onBlur={handleChange}
                        />
                      </CInputGroup>
                      <Form.Text style={{ color: "red" }}>
                        {userNameError}
                      </Form.Text>
                      <CInputGroup className="mb-4">
                        <CInputGroupText>
                          <CIcon icon={cilLockLocked} />
                        </CInputGroupText>
                        <CFormInput
                          type="password"
                          placeholder="Password"
                          name="password"
                          value={formData.password || ""}
                          autoComplete="off"
                          onChange={handleChange}
                          onBlur={handleChange}
                        />
                      </CInputGroup>
                      <Form.Text style={{ color: "red" }}>
                        {passwordError}
                      </Form.Text>
                      <CRow>
                        <CCol xs={6}>
                          <CButton
                            color="primary"
                            className="px-4"
                            disabled={disable}
                            onClick={handleSubmit}
                          >
                            Login
                          </CButton>
                        </CCol>
                        {/* <CCol xs={6} className="text-right">
                          <CButton color="link" className="px-0">
                            Forgot password?
                          </CButton>
                        </CCol> */}
                        <Form.Text style={{ color: "red" }}>
                          {validUserError}
                        </Form.Text>
                      </CRow>
                    </CCardBody>
                  </CCard>
                  <CCard
                    className="text-white bg-primary py-5"
                    style={{ width: "44%" }}
                  >
                    <CCardBody className="text-center">
                      <div>
                        <h2>Sign up</h2>
                        <p>Don't have an Account? Sign up is Here !</p>
                        <Link to="/signup">
                          <CButton
                            color="primary"
                            className="mt-3"
                            active
                            tabIndex={-1}
                          >
                            Register Now!
                          </CButton>
                        </Link>
                      </div>
                    </CCardBody>
                  </CCard>
                </CCardGroup>
              </CForm>
            </CCol>
          </CRow>
        </CContainer>
      </div>
    </>
  );
}
