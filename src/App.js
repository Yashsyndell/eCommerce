import "font-awesome/css/font-awesome.min.css";
import "./assets/css/app.css";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login.js";
import { useState } from "react";
import Protected from "./Protected";
import ProductShow from "./components/ProductShow.js";
import Productcrud from "./components/Productcrud";
import TableView from "./components/TableView";
import Sidebar from "./common/sidebar";
import Adminprote from "./Adminprote";
import MasterProte from "./MasterProte";
import AddCart from "./components/AddCart";
import Nav from "./components/Nav";

function App() {
  const [data, setData] = useState(undefined);
  const [isLoggedIn, setIsloggedIN] = useState(false);
  const getdata = (val) => {
    setData(val);
    if (val[0].type) {
      setIsloggedIN(true);
    }
  };
  const setISlog = () => {
    setData(undefined);
    setIsloggedIN(false);
  };


  return (
    <div>
      {data === undefined ? (
        ""
      ) : data[0].type === "user" ? (
        <Nav/>
      ) : (
        <Sidebar udata={data[0]} />
      )}

      <Routes>
        <Route
          path="/"
          element={<Login getd={getdata} setISlog={setISlog} />}
        />
      </Routes>
      <Protected isLoggedIn={isLoggedIn}>
        {data === undefined ? (
          ""
        ) : data[0].type === "user" ? (
          <Routes>
            <Route path="/Product-list" element={<ProductShow udata={data[0]} />}></Route>
            <Route path="/Addcart" element={<AddCart/>}></Route>
          </Routes>
        ) : 
        data === undefined ? (
          ""
        ) : (
          <Adminprote isLoggedIn={data[0].type}>
            <Routes>
              <Route path="/productcrud" element={<Productcrud udata={data[0]} />} />
            </Routes>
            <MasterProte>
            <Routes>
              <Route path="/tableview" element={<TableView />} />
            </Routes>
            </MasterProte>
          </Adminprote>
        )}
      </Protected>
    </div>
  );
}

export default App;

