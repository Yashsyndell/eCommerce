import { Navigate } from "react-router-dom";
const MasterProte=({ isLoggedIn, children })=>{
    if (isLoggedIn==="admin") {
        return <Navigate to="/productcrud" replace />;
      }
      return children;
}

export default MasterProte;