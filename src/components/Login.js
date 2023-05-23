import "./CSS/Login.css";
import { useFormik } from "formik";
import Loginvalidation from "./validation/Loginvalidation";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const intialval = {
  email: "",
  pass: "",
};
const Login = (props) => {
  
  const [showpass, setShowpass] = useState(false);
  const [typepass, setTypepass] = useState("password");
  const navigate = useNavigate();
  const {
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    handleReset,
    values,
    errors,
  } = useFormik({
    initialValues: intialval,
    validationSchema: Loginvalidation,
    onSubmit: async (val) => {
      try {
        let userdata = {
          email: val.email,
          pass: val.pass,
        };
        try {
          const data = await fetch("http://localhost:3000/get-userdetails", {
            method: "post",
            body: JSON.stringify(userdata),
            headers: {
              "Content-Type": "application/json",
            },
          });

          const resp = await data.json();
          if (resp !== false) {
            props.getd(resp);
            props.getd(resp);
          }

          if (resp === false) {
            alert("Email and password are not valid...");
            handleReset();
          } else {
            props.getd(resp);
            if (resp[0].type === "masteradmin" || resp[0].type === "admin") {
              navigate("/productcrud", {
                state: resp[0],
              });
            }
            if (resp[0].type === "user") {
              navigate("/Product-list", {
                state: resp[0],
              });
            }
          }
        } catch {
          alert("Error in login api");
        }
      } catch {
        alert("Error in Login functionality");
      }
    },
  });
  const location1 = useLocation();
  if (location1.state) {
    props.setISlog();
  }
  return (
    <div className="container-fluid cnt-login">
      <div className="row r1-lg">
        <div className="box">
          <div className="title-head">
            <span>
              <p className="lg-title">Sign In</p>
            </span>
          </div>
          <div className="form-head">
            <form onSubmit={handleSubmit}>
              <div>
                <input
                  className="input-tag"
                  type="email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Email Address"
                ></input>
                {touched.email && errors.email ? (
                  <p className="text-erros-lg">{errors.email}</p>
                ) : (
                  ""
                )}
              </div>
              <div>
                <input
                  className="input-tag"
                  type={typepass}
                  name="pass"
                  maxLength="8"
                  value={values.pass}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Password"
                ></input>
                {touched.pass && errors.pass ? (
                  <p className="text-erros-lg">{errors.pass}</p>
                ) : (
                  ""
                )}
              </div>
              <div className="show-hide-pass-lg">
                <span>
                  <input
                    type="checkbox"
                    onChange={() => {
                      setShowpass(!showpass);
                      showpass ? setTypepass("password") : setTypepass("text");
                    }}
                  ></input>
                  {showpass ? "Hide Password" : "Show Password"}
                </span>
              </div>
              <div></div>
              <div>
                <button type="submit" className="login-btn">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
