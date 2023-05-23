import { Table } from "react-bootstrap";
import "./CSS/TableView.css";
import { useEffect, useState } from "react";

const TableView = () => {
  const [userlist, setUserlist] = useState([]);

  useEffect(() => {
    allUserdetails();
  }, []);

  const allUserdetails = async () => {
   try{
    let data = await fetch("http://localhost:3000/user_details");
    let resp = await data.json();
    setUserlist(resp);
   }
   catch{
    alert("Error in geting user reights details.");
   }
  };
  const check = async (val1, t1, f1) => {
  try{
    try{
      if (f1 === undefined) {
        const db = {
          id: val1,
          type: t1,
        };
        let data = await fetch("http://localhost:3000/update-type", {
          method: "put",
          body: JSON.stringify(db),
          headers: {
            "Content-Type": "application/json",
          },
        });
        let resp = await data.json();
        if(resp===true)
        {
          alert("Rights are change..");
        }
        else{
          alert("Rights are not change..");
        }
        allUserdetails();
      }
    }
    catch{
      alert("Error come in updateing admin and user rights..");
    }
    try{
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
        if(resp===false){
          alert("Error at update rights..");
        }
        allUserdetails();
      }
    }
    catch{
      alert("Error come at give update rights time..");
    }
   try{
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
      if(resp===false){
        alert("Error at remove rights..");
      }
      allUserdetails();
    }
   }
   catch{
    alert("Error come at give delete rights time..");
   }
  }
  catch{
    alert("Error come in checking rights of functionality.");
  }
  };


  return (
    <div className="container-fluid cnt-tbv">
      <div className="row r2-tbv">
        <div className="box-tbv" style={{ marginTop: "20px" }}>
          <div>
          <h1 style={{textAlign:"center",fontSize:"26px",padding:"10px"}}>LIST OF ADMIN & USER</h1>
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
                  ? <h2>List is empty</h2>
                  : userlist.map((i, key) => (
                      <tr>
                        <td>{key + 1}</td>
                        <td>{i.email}</td>
                        <td>
                          {i.type === "admin" ? (
                            <input type="radio" name={i.id} checked></input>
                          ) : (
                            <input
                              type="radio"
                              name={i.id}
                              onClick={() => check(i.id, "admin")}
                            ></input>
                          )}
                        </td>
                        <td>
                          {i.type === "user" ? (
                            <input type="radio" name={i.id} checked></input>
                          ) : (
                            <input
                              type="radio"
                              name={i.id}
                              onClick={() => check(i.id, "user")}
                            ></input>
                          )}
                        </td>
                        <td className="table-chek-tbv">
                          {i.type === "user" ? (
                            ""
                          ) : i.upd === "1" ? (
                            <input
                              type="checkbox"
                              checked
                              value={i.upd}
                              onClick={() => check(i.id, "0", "upd")}
                            ></input>
                          ) : (
                            <input
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
                              type="checkbox"
                              checked
                              value={i.del}
                              onClick={() => check(i.id, "0", "del")}
                            ></input>
                          ) : (
                            <input
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
