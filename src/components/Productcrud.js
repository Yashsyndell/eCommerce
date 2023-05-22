import { useFormik } from "formik";
import "./CSS/Productcrud.css";
import { Table } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
let initialValue = {
  prdname: "",
  details: "",
  price: "",
};
const Productcrud = () => {
  const [upimg, setUpimg] = useState([]);
  const [imglist, setImglist] = useState([]);
  const [updbtn, setUpdbtn] = useState(false);
  const [delbtn, setDelbtn] = useState(false);
  const [id, setID] = useState();
  const [imgsrc, setImgsrc] = useState();
  useEffect(() => {
    getimgdetail();
  }, []);
  const getimgdetail = async () => {
    const data = await fetch("http://localhost:3000/get-imagedetails");
    let resp = await data.json();
    setImglist(resp);
  };
  const { handleBlur, handleChange, handleSubmit, values, handleReset } =
    useFormik({
      initialValues: initialValue,
      validationSchema: "",
      onSubmit: async (val) => {
        if (!updbtn & !delbtn) {
          const formdata = new FormData();
          formdata.append("image", upimg);
          formdata.append("prdname", val.prdname);
          formdata.append("details", val.details);
          formdata.append("price", val.price);
          // console.log(val,upimg);
          const res = await axios.post(
            "http://localhost:3000/insert-imgdetails",
            formdata
          );
        }
        if (updbtn & !delbtn) {
          if (upimg.name) {
            const formdata = new FormData();
            formdata.append("image", upimg);
            formdata.append("prdname", values.prdname);
            formdata.append("details", values.details);
            formdata.append("price", values.price);
            console.log("img");
          } else {
            const db = {
              id: id,
              name: values.prdname,
              details: values.details,
              price: values.price,
              imgsrc: imgsrc,
            };
            console.log(db);
          }
          setDelbtn(false);
          setUpdbtn(false);
          handleReset();
        }
        if (!updbtn & delbtn) {
          setUpdbtn(false);
          setDelbtn(false);
        }

        getimgdetail();
        handleReset();
        setUpimg([]);
      },
    });

  const setImgData = (d) => {
    values.prdname = d.name;
    values.details = d.details;
    values.price = d.price;
  };
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
                  onChange={(e) => {
                    setUpimg(e.target.files[0]);
                  }}
                  className="input-pdc file-uload-pdc"
                  accept=".img,.jpg"
                ></input>
              </span>
            </div>
            <div className="butn-group-pdc">
              {!updbtn & !delbtn ? (
                <button type="submit" className="pdc-btn">
                  Add item
                </button>
              ) : updbtn & !delbtn ? (
                <button type="submit" className="pdc-btn">
                  Update item
                </button>
              ) : (
                <button type="submit" className="pdc-btn">
                  Delete item
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
      <div className="row r2-pdc">
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
                  <th>Update</th>
                  <th>Remove</th>
                </tr>
              </thead>
              <tbody>
                {imglist.length < 0
                  ? ""
                  : imglist.map((i, key) => (
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
                        <td className="table-chek">
                          <input
                            type="button"
                            onClick={() => {
                              setID(i.id);
                              setImgsrc(i.imgsrc);
                              setDelbtn(false);
                              setUpdbtn(true);
                              setImgData(i);
                            }}
                            value="Update"
                          ></input>
                        </td>
                        <td className="table-chek">
                          <input
                            type="button"
                            onClick={() => {
                              setUpdbtn(false);
                              setDelbtn(true);
                            }}
                            value="Delete"
                          ></input>
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

export default Productcrud;
