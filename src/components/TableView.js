import { Table } from "react-bootstrap";
import "./CSS/TableView.css";
import { useEffect, useState } from "react";
const TableView = () => {
  const [userlist, setUserlist] = useState([]);
  useEffect(() => {
    allUserdetails();
  }, []);

  const allUserdetails = async () => {
    let data = await fetch("http://localhost:3000/user_details");
    let resp = await data.json();
    setUserlist(resp);
  };
  return (
    <div className="container-fluid cnt-tbv">
      <div className="row r2-tbv">
        <div className="box-tbv" style={{ marginTop: "20px" }}>
          <div>
            <Table striped>
              <thead>
                <tr>
                  <th>No.</th>
                  <th>email</th>
                  <th>Admin</th>
                  <th>User</th>
                  <th>update</th>
                  <th>delete</th>
                </tr>
              </thead>
              <tbody>
                {userlist.length < 0
                  ? ""
                  : userlist.map((i, key) => (
                      <tr>
                        <td>{key + 1}</td>
                        <td>{i.email}</td>
                        <td>
                          <input type="radio" name="radiogroup"></input>
                        </td>
                        <td>
                          <input type="radio" name="radiogroup"></input>
                        </td>
                        <td className="table-chek-tbv">
                          <input type="checkbox"></input>
                        </td>
                        <td className="table-chek-tbv">
                          <input type="checkbox"></input>
                        </td>
                      </tr>
                    ))}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableView;
