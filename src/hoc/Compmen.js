// import { Routes, Route } from "react-router-dom";
// import Productcrud from "../components/Productcrud";
// import TableView from "../components/TableView";
// import Sidebar from "../common/sidebar";
// import Adminprote from "../Adminprote";
// import MasterProte from "../MasterProte";
const Compmen = (props) => {
  console.log(props.data[0].type);

  
  return (
    <div>
      {/* <Sidebar udata={props.data[0]} /> */}
      {/* <div>
        <Adminprote isLoggedIn={props.data[0].type}>
          <Routes>
            <Route path="/compmen/productcrud"  element={<Productcrud/>} />
          </Routes>
          <MasterProte>
            <Routes>
              <Route path="/compmen/tableview"   element={<TableView />} />
            </Routes>
          </MasterProte>
        </Adminprote>
      </div> */}
    </div>
  );
};

export default Compmen;
