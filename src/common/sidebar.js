import React from "react";
import "react-perfect-scrollbar/dist/css/styles.css";
import PerfectScrollbar from "react-perfect-scrollbar";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const Sidebar = (props) => {
  // console.log(props.udata);
const navigae1 = useNavigate();
  return (
    <div className="border-end sidenav" id="sidebar-wrapper">
      <div className="sidebar-heading border-bottom ">
        <Link to="/">{props.udata.email}</Link>
      </div>
      <PerfectScrollbar className="sidebar-items">
        <ul className="list-unstyled ps-0">
          {props.udata.type === "admin" ||
              props.udata.type === "masteradmin" ? (
                <li className="mb-1">
                  <Link tag="a" to="/productcrud" >
                    <i className="fa fa-dashboard"></i> Product
                  </Link>
                </li>
              ) : (
                ""
              )}
              {props.udata.type === "masteradmin" ? (
                <li className="mb-1">
                  <Link tag="a" to="/tableview" >
                    <i className="fa fa-file-o"></i>Table View
                  </Link>
                </li>
              ) : (
                ""
              )}
        </ul>
      </PerfectScrollbar>
      <div className="dropdown fixed-bottom-dropdown">
                <a href="#" className="d-flex align-items-center text-decoration-none dropdown-toggle" id="dropdownUser2" data-bs-toggle="dropdown" aria-expanded="false">
                    <img src="https://via.placeholder.com/50" alt="" width="32" height="32" className="rounded-circle me-2" />
                    <span>Tarun Dhiman</span>
                </a>
                <ul className="dropdown-menu text-small shadow" aria-labelledby="dropdownUser2">
                    <li><Link className="dropdown-item" to="/profile"><i className="fa fa-user-circle" aria-hidden="true"></i> Profile</Link></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><a  className="dropdown-item" onClick={()=>navigae1("/",{state:true})}  ><i className="fa fa-sign-out" aria-hidden="true"></i> Sign out</a></li>
                </ul>
            </div>
    </div>
  );
};

export default Sidebar;
