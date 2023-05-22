import { Table } from "react-bootstrap";
import "./CSS/TableView.css";
import { useEffect, useState } from "react";

const TableView = () => {
  const [userlist, setUserlist] = useState([]);

  useEffect(() => {
    allUserdetails();
  },[]);

  const allUserdetails = async () => {
    let data = await fetch("http://localhost:3000/user_details");
    let resp = await data.json();
    setUserlist(resp);
  };
  const check = async (val1, t1, f1) => {
    if(f1===undefined){
      const db={
        id: val1,
        type: t1,
      }
      let data = await fetch("http://localhost:3000/update-type", {
        method: "put",
        body: JSON.stringify(db),
        headers: {
          "Content-Type": "application/json",
        },
      });
      let resp = await data.json();
      console.log(resp);
    }
    if (f1 === "upd") {
      const bd = {
        id: val1,
        upd: t1,
      };
      let data = await fetch("http://localhost:3000/update-rights", {
        method: "put",
        body: JSON.stringify(bd),
        headers: {
          "Content-Type": "application/json",
        },
      });

      let resp = await data.json();
      console.log(resp);
    }
    if (f1 === "del") {
      const bd = {
        id: val1,
        del: t1,
      };
      let data = await fetch("http://localhost:3000/delete-rights", {
        method: "put",
        body: JSON.stringify(bd),
        headers: {
          "Content-Type": "application/json",
        },
      });

      let resp = await data.json();
      console.log(resp);
    }
    allUserdetails();
  };
  // const setCheck = (val) => {
  //   $(val).attr("checked", "checked");
  // };

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
                          {
                            i.type==="admin"?<input
                            type="radio"
                            name={i.id}
                            checked
                          ></input>:<input
                            type="radio"
                            name={i.id}
                            onClick={() => check(i.id, "admin")}
                          ></input>
                          }
                        </td>
                        <td>
                           {
                            i.type==="user"?<input
                            type="radio"
                            name={i.id}
                            checked
                          ></input>:<input
                            type="radio"
                            name={i.id}
                            onClick={() => check(i.id, "user")}
                          ></input>
                          }
                        </td>
                        <td className="table-chek-tbv">
                          {i.type === "user" ? (
                            ""
                          ) : i.upd === "1" ? (
                            <input
                              id="chek1"
                              type="checkbox"
                              checked
                              value={i.upd}
                              onClick={() => check(i.id, "0", "upd")}
                            ></input>
                          ) : (
                            <input
                              id="chek1"
                              type="checkbox"
                              value={i.upd}
                              onClick={() => check(i.id, "1", "upd")}
                            ></input>
                          )}
                        </td>
                        <td className="table-chek-tbv">
                          {i.type === "user" ? (
                            ""
                          ) : i.del === "1" ? (
                            <input
                              id="chek2"
                              type="checkbox"
                              checked
                              value={i.del}
                              onClick={() => check(i.id, "0", "del")}
                            ></input>
                          ) : (
                            <input
                              id="chek2"
                              type="checkbox"
                              value={i.del}
                              onClick={() => check(i.id, "1", "del")}
                            ></input>
                          )}
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
