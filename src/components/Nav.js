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

  const addActive = (val, lis1) => {
    $(val).addClass("active");

    for (let i of lis1) {
      $(i).removeClass("active");
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
            <a
            className="a1"
              onClick={() => {
                addActive(".a1", [".a2", ".a3", ".a4"]);
                navigate("/Product-list");
              }} 
            >
              Home
            </a>
          </span>
          <span>
            <a
              className="a2"
              onClick={() => {
                addActive(".a2", [".a1", ".a3", ".a4"]);
              }}
            >
              Contact Us
            </a>
          </span>
          <span>
            <a
              className="fa fa-shopping-cart a3"
              style={{ fontSize: "24px" }}
              onClick={() => {
                addActive(".a3", [".a1", ".a2", ".a4"]);
                navigate("/Addcart");
              }}
            ></a>
          </span>
          <span>
            <a
              className="a4"
              onClick={() => {
                addActive(".a4", [".a1", ".a2", ".a3"]);
                navigate("/");
              }}
            >
              <i className="fa fa-sign-out" style={{ fontSize: "24px" }}></i>
            </a>
          </span>
        </div>
      </nav>
      
    </div>
  );
};


export default Nav;
