import { Navigate } from "react-router-dom";
const Adminprote = ({ isLoggedIn, children }) => {
  if (isLoggedIn==="user") {
    return <Navigate to="/" replace />;
  }
  return children;
};
export default Adminprote;
