import "font-awesome/css/font-awesome.min.css";
import "./assets/css/app.css";
// import DashboardPage from "./pages/DashboardPage";
// import TypographyPage from "./pages/TypographyPage";
// import LoginPage from "./pages/auth/LoginPage";
// import ResetPassword from "./pages/auth/ResetPassword";
// import ProfilePage from "./pages/profile/ProfilePage";
// import ChangePasswordPage from "./pages/profile/ChangePasswordPage";
// import UserPreferencesPage from "./pages/profile/UserPreferencesPage";
// import AdminBlankPage from "./pages/AdminBlankPage";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login.js";
import { useState } from "react";
import Compmen from "./hoc/Compmen";
import Protected from "./Protected";
import ProductShow from "./components/ProductShow.js";
import Productcrud from "./components/Productcrud";
import TableView from "./components/TableView";
import Sidebar from "./common/sidebar";
import Adminprote from "./Adminprote";
import MasterProte from "./MasterProte";
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
  };
  // let pathName = window.location.pathname;
  // let arr = pathName.toString().split("/");
  // let currentPath = arr[arr.length - 1];

  return (
    <>
      {data === undefined ? (
        ""
      ) : data[0].type === "user" ? (
        ""
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
    </>
  );
}

export default App;

{
  /* <Route exact path="/login" element={<LoginPage />} />
        <Route exact path="/reset-password" element={<ResetPassword />} /> */
}
{
  /* <Route exact path="/profile" element={<ProfilePage />} />
        <Route exact path="/change-password" element={<ChangePasswordPage />} />
        <Route exact path="/preferences" element={<UserPreferencesPage />} />
        <Route exact path="/typography" element={<TypographyPage />} />
        <Route exact path="/blank-page" element={<AdminBlankPage />} />
        <Route exact path="/dashboard" element={<DashboardPage />}></Route> */
}
