import { useFormik } from "formik";
import "./CSS/Productcrud.css";
import { Table } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import Productcrudvalidation from "./validation/Productcrudvalidation";

let initialValue = {
  prdname: "",
  details: "",
  price: "",
};
const Productcrud = (props) => {
  const [upimg, setUpimg] = useState([]);
  const [imglist, setImglist] = useState([]);
  const [keychange,setKeychange]=useState();
  const [updbtn, setUpdbtn] = useState(false);
  const [id, setID] = useState();
  const [imgsrc, setImgsrc] = useState();
  useEffect(() => {
    getimgdetail();
  }, []);
  const getimgdetail = async () => {
    try {
      const data = await fetch("http://localhost:3000/get-imagedetails");
      let resp = await data.json();
      setImglist(resp);
    } catch {
      alert("Error in geting image list api...");
    }
  };
  const {
    handleBlur,
    handleChange,
    handleSubmit,
    values,
    errors,
    handleReset,
  } = useFormik({
    initialValues: initialValue,
    validationSchema: Productcrudvalidation,
    onSubmit: async (val) => {
      if (!updbtn) {
        try {
          const formdata = new FormData();
          formdata.append("image", upimg);
          formdata.append("uid", props.udata.id);
          formdata.append("prdname", val.prdname);
          formdata.append("details", val.details);
          formdata.append("price", val.price);
          const res = await axios.post(
            "http://localhost:3000/insert-imgdetails",
            formdata
          );

          if (res.data === true) {
            alert("Product is inserted..");
          } else {
            alert("Error in data inserted time...");
          }
          setKeychange(0);
        } catch {
          alert("Error in insert image details api");
        }
      }
      if (updbtn) {
        if (upimg.name) {
          try {
            const formdata = new FormData();
            formdata.append("image", upimg);
            formdata.append("name", values.prdname);
            formdata.append("details", values.details);
            formdata.append("price", values.price);
            formdata.append("id", id);
            formdata.append("imgsrc", imgsrc);

            const data = await axios.put(
              "http://localhost:3000/update-imgData",
              formdata
            );
            if (data.data === true) {
              alert("Product is updated..");
            } else {
              alert("Product is not updated...");
            }
            setUpdbtn(false);
          } catch {
            alert("Error in updateing img with data api...");
          }
        } else {
          try {
            const db = {
              id: id,
              name: values.prdname,
              details: values.details,
              price: values.price,
            };
            const data = await fetch("/update-dataOfimg", {
              method: "put",
              body: JSON.stringify(db),
              headers: {
                "Content-Type": "application/json",
              },
            });
            let resp = await data.json();
            if (resp === true) {
              alert("Data updated..");
            } else {
              alert("Data not updated...");
            }
          } catch {
            alert("Error in updateting only image product data...");
            handleReset();
          }
        }

        setUpdbtn(false);
      }
      getimgdetail();
      handleReset();
      setKeychange(1);
    },
  });

  const deleteImgdata = async (id, imgsrc) => {
    try {
      const db = {
        id: id,
        imgsrc: imgsrc,
      };
      const data = await fetch("http://localhost:3000/delete-imgData", {
        method: "delete",
        body: JSON.stringify(db),
        headers: {
          "Content-Type": "application/json",
        },
      });
      let resp = await data.json();
      if (resp === true) {
        alert("product is removed.");
      }
      setUpdbtn(false);
      getimgdetail();
    } catch {
      alert("Error in delete api..");
    }
  };
  return (
    <div className="container-fluid cnt-pdc">
      <div className="row r1-pdc">
        <div className="head-box-prdcrud1">
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
                {errors.prdname ? (
                  <p className="text-erros-lg-prdcrud">{errors.prdname}</p>
                ) : (
                  ""
                )}
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
                {errors.details ? (
                  <p className="text-erros-lg-prdcrud">{errors.details}</p>
                ) : (
                  ""
                )}
              </span>
            </div>
            <div className="input-group">
              <span>Price</span>
              <span>
                <input
                  type="number"
                  name="price"
                  value={values.price}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="input-pdc"
                  placeholder="Enter amount"
                ></input>
                {errors.price ? (
                  <p className="text-erros-lg-prdcrud">{errors.price}</p>
                ) : (
                  ""
                )}
              </span>
            </div>
            <div className="input-group">
              <span>Pohote</span>
              <span>
                <input
                  type="file"
                  name="upimg"
                  key={keychange}
                  onChange={(e) => {
                    setUpimg(e.target.files[0]);
                  }}
                  className="input-pdc file-uload-pdc"
                  accept=".img,.jpg"
                ></input>
              </span>
            </div>
            <div className="butn-group-pdc">
              {!updbtn ? (
                <button type="submit" className="pdc-btn">
                  Add item
                </button>
              ) : updbtn ? (
                <button type="submit" className="pdc-btn">
                  Update item
                </button>
              ) : (
                <button type="submit" className="pdc-btn">
                  Add item
                </button>
              )}
            </div>
          </form>
        </div>
        </div>
      {/* </div> */}
      {/* <div className="row r2-pdc"> */}
      <div className="head-box-prdcrud2">
        <div className="box-pdc2" style={{ marginTop: "20px" }}>
          <div>
            <Table striped>
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Price</th>
                  {props.udata.upd === "1" ? <th>Update</th> : ""}
                  {props.udata.del === "1" ? <th>Remove</th> : ""}
                </tr>
              </thead>
              <tbody>
                {imglist.length < 0 ? (
                  <h1>List is empty</h1>
                ) : (
                  imglist.map((i, key) => (
                    <tr key={key}>
                      <td>{key + 1}</td>
                      <td>
                        <img
                          src={`http://localhost:3000${i.imgsrc}`}
                          className="img-prd"
                          alt="logo"
                        ></img>
                      </td>
                      <td>{i.name}</td>
                      <td>{i.details}</td>
                      <td>&#8377;{i.price}</td>
                      {props.udata.upd === "1" ? (
                        <td className="table-chek">
                          <input
                            type="button"
                            className="input-btn-style1"
                            onClick={() => {
                              setID(i.id);
                              setImgsrc(i.imgsrc);
                              setUpdbtn(true);
                            }}
                            value="Update"
                          ></input>
                        </td>
                      ) : (
                        ""
                      )}
                      {props.udata.del === "1" ? (
                        <td className="table-chek">
                          <input
                            type="button"
                            className="input-btn-style2"
                            onClick={() => {
                              deleteImgdata(i.id, i.imgsrc);
                            }}
                            value="Delete"
                          ></input>
                        </td>
                      ) : (
                        ""
                      )}
                    </tr>
                  ))
                )}
              </tbody>
            </Table>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Productcrud;
