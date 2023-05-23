import Nav from "./Nav.js";
import "./CSS/AddCart.css";
import { useEffect, useState } from "react";
const AddCart = () => {
  useEffect(() => {
    getAddcartlist();
  }, [ ]);
  const [addcartlist, setAddcartlist] = useState([]);
  const [totalsum, setTotalsum] = useState();
  const getAddcartlist = async () => {
    const data = await fetch("http://localhost:3000/get-cartlist");
    let resp = await data.json();
    setAddcartlist(resp);
    getTotalsum(resp[0].uid);
  };

  const getTotalsum = async (i) => {
    let db = {
      id: i,
    };
    const data = await fetch("http://localhost:3000/get-sumtotal", {
      method: "post",
      body: JSON.stringify(db),
      headers: {
        "Content-Type": "application/json",
      },
    });

    let resp = await data.json();
    setTotalsum(resp[0].totalsum);
  };
  const removePrd = async (i) => {
    let db = {
      id: i,
    };
    const data = await fetch("http://localhost:3000/delete-prdCart", {
      method: "delete",
      body: JSON.stringify(db),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const resp = await data.json();
    if (resp === true) {
      alert("Product removed from cart");
    }
    getAddcartlist();
  };
  return (
    <div className="container-fluid">
      <div className="row r1-prdshow">
        <div>
          <Nav />
        </div>
      </div>
      <div className="row r2-addcart-adc">
        <div className="head-box-adc">
          {addcartlist.length < 0
            ? ""
            : addcartlist.map((i, key) => (
                <div className="box bx-1-adc" key={key}>
                  <div>
                    <div>
                      <img
                        src={`http://localhost:3000${i.imgsrc}`}
                        className="prd-img-adc"
                        alt="prdimg"
                      ></img>
                    </div>
                  </div>
                  <div className="sub-box-2-adc">
                    <div className="subbox-2-adc">
                      <div className="div-1-adc">
                        <span>{i.name}</span>
                      </div>
                      <div className="div-2-adc">
                        <span>&#8377; {i.price}</span>
                      </div>
                      <div className="div-3-adc">
                        <span>{i.details}</span>
                      </div>
                      <div>
                        <button
                          className="div-4-adc"
                          onClick={() => removePrd(i.id)}
                        >
                          REMOVE FROM CART
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
        </div>
      </div>
      <div className="row r3-addcart-adc">
        <div className="head-box">
          <div className="box bx-2-adc">
            <div className="sub-box-2">
              <div className="subbox-2">
                {addcartlist.length < 0
                  ? ""
                  : addcartlist.map((i, key) => (
                      <>
                        <div className="div-2">
                          <span>Product Name :-{i.name}</span>
                        </div>
                        <div className="div-2">
                          <span>Price : &#8377;{i.price}</span>
                        </div>
                        <hr />
                      </>
                    ))}
                <div className="div-2">
                  <span>Total Amount : &#8377; {totalsum}</span>
                </div>
                <div className="div-3">
                  <span></span>
                </div>
                <div>
                  <button
                    className="div-4"
                    onClick={() => {
                     alert("Order is confirem..");
                    }}
                  >
                    PLACE ORDER
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCart;
