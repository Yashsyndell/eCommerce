import { useFormik } from "formik";
import "./CSS/Productcrud.css";
import { Table } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
let initialValue={
  prdname:"",
  details:"",
  price:""
}
const Productcrud = () => {
  const [upimg,setUpimg]=useState([]);
  const {handleBlur,handleChange,handleSubmit,values,handleReset} = useFormik({
    initialValues:initialValue,
    validationSchema:"",
    onSubmit: async (val)=>{
      const formdata =new FormData();
        formdata.append("upimg",upimg);
        formdata.append("prdname",val.prdname);
        formdata.append("details",val.details);
        formdata.append("price",val.price);
        // console.log(val,upimg);
        const res = await axios.post("http://localhost:3000/insert-imgdetails",formdata);

      


        handleReset();
        setUpimg([]);
    }
  });
  return (
    <div className="container-fluid cnt-pdc">
      <div className="row r1-pdc">
        <div className="box-pdc">
          <form onSubmit={handleSubmit}>
            <div>
              <span>
                <p className="add-text">Add new item</p>
              </span>
            </div>
            <div className="input-group">
              <span>Name</span>
              <span>
                <input
                  type="text"
                  name="prdname"
                  value={values.prdname}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="input-pdc"
                  placeholder="Enter Product Name"
                ></input>
              </span>
            </div>
            <div className="input-group">
              <span>Description</span>
              <span>
                <textarea
                  type="text"
                  name="details"
                  value={values.details}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="input-pdc"
                  placeholder="Describe your product"
                ></textarea>
              </span>
            </div>
            <div className="input-group">
              <span>Price</span>
              <span>
                <input
                  type="text"
                  name="price"
                  value={values.price}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="input-pdc"
                  placeholder="Enter amount"
                ></input>
              </span>
            </div>
            <div className="input-group">
              <span>Pohote</span>
              <span>
                <input
                  type="file"
                  name="upimg"
                  onChange={(e)=>{setUpimg(e.target.files[0])}}
                  className="input-pdc file-uload-pdc"
                  placeholder="Enter amount"
                  accept=".img,.jpg"
                ></input>
              </span>
            </div>
            <div className="butn-group-pdc">
              <button type="submit" className="pdc-btn">Add item</button>
            </div>
          </form>
        </div>
      </div>
      <div className="row r2-pdc">
      <div className="box-pdc2" style={{ marginTop: "20px" }}>
          <div>
            <Table  striped>
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Price</th>
                  <th>Update</th>
                  <th>Remove</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td><img src={require("../assets/images/logo.png")} style={{backgroundColor:"black"}} alt="logo"></img></td>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>100</td>
                  <td className="table-chek"><input type="button" value="Update"></input></td>
                  <td className="table-chek"><input type="button" value="Delete"></input></td>
                </tr>
                <tr>
                  <td>2</td>
                  <td><img src={require("../assets/images/logo.png")} style={{backgroundColor:"black"}} alt="logo"></img></td>
                  <td>Jacob</td>
                  <td>Thornton</td>
                  <td>120</td>
                  <td className="table-chek"><input type="button" value="Update"></input></td>
                  <td className="table-chek"><input type="button" value="Delete"></input></td>
                </tr>
                <tr>
                  <td>3</td>
                  <td><img src={require("../assets/images/logo.png")} style={{backgroundColor:"black"}} alt="logo"></img></td>
                  <td>Larry the Bird</td>
                  <td>Thornton</td>
                  <td>230</td>
                  <td className="table-chek"><input type="button" value="Update"></input></td>
                  <td className="table-chek"><input type="button" value="Delete"></input></td>
                </tr>
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Productcrud;
