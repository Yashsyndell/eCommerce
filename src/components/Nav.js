import { useState } from "react";
import "./CSS/Nav.css";
import $ from "jquery";
import { useNavigate } from "react-router-dom";
const Nav = () => {
  const [bar, setBar] = useState(true);
  const showsidbar = () => {
    if (bar) {
      $(".list-item").addClass("show-sider");
    } else {
      $(".list-item").removeClass("show-sider");
    }
  };
  const navigate = useNavigate();
  return (
    <div className="row r1-nav">
      <nav
        className="nav-site"
        style={{ backgroundColor: "black", padding: "30px" }}
      >
        <div className="img-div">
          <span className="bar-slider">
            {bar ? (
              <button
                className="fa fa-bars bar-btn"
                onClick={() => {
                  showsidbar();
                  setBar(!bar);
                }}
              ></button>
            ) : (
              <button
                className="fa fa-times bar-btn"
                onClick={() => {
                  showsidbar();
                  setBar(!bar);
                }}
              ></button>
            )}
          </span>
        </div>
        <div className="list-item">
          <span>
            <a>Home</a>
          </span>
          <span>
            <a>Contact Us</a>
          </span>
          <span>
            <a
              className="fa fa-shopping-cart"
              style={{ fontSize: "24px" }}
            ></a>
          </span>
          <span>
            <a  onClick={() => {
                navigate("/");
              }}>
              <i
                className="fa fa-sign-out"
                style={{ fontSize: "24px" }}
              ></i>
            </a>
          </span>
        </div>
      </nav>
    </div>
  );
};

export default Nav;
