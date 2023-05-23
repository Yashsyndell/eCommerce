import { useEffect, useState } from "react";
import "./CSS/ProductShow.css";
import Nav from "./Nav.js";
const ProductShow = (props) => {

  const [prdlist,setPrdlist]=useState([]);

  useEffect(()=>{
    getAllProduct();
  },[]);
  const getAllProduct = async ()=>{
   try{
    const data = await fetch("http://localhost:3000/get-imagedetails");
    let resp = await data.json();
    setPrdlist(resp);
   }
   catch{
    alert("Error at geting image details");
   }
  }


  const addInCart= async(val)=>{
    try{
      const db={
        uid:props.udata.id,
        pid:val.id,
        name:val.name,
        details:val.details,
        price:val.price,
        imgsrc:val.imgsrc
       }
  
       const data = await fetch("http://localhost:3000/addIN-cart",{
        method:"post",
        body:JSON.stringify(db),
        headers:{
          "Content-Type":"application/json"
        }
       });
  
       let resp = await data.json()
       if(resp===true)
       {
        alert("Product added in cart...");
       }
       else{
        alert("Error product not add in cart");
       }
    }
    catch{
      alert("Error come in adding cart entrese");
    }
  }
  return (
    <div className="container-fluid">
      <div className="row r1-prdshow">
        <div>
          <Nav />
        </div>
      </div>
      <div className="row r2-prdshow">
        <div className="head-box">
          {
            prdlist.length<0?<h2>List is empty...</h2>:
            prdlist.map((i,key)=>
            <div className="box bx-1">
            <div className="sub-box-1">
              <div>
                <img
                  src={`http://localhost:3000${i.imgsrc}`}
                  className="prd-img"
                  alt="prdimg"
                ></img>
              </div>
            </div>
            <div className="sub-box-2">
              <div className="subbox-2">
                <div  className="div-1">
                  <span>{i.name}</span>
                </div>
                <div className="div-2" >
                  <span >&#8377; {i.price}</span>
                </div>
                <div className="div-3" >
                  <span >{i.details}</span>
                </div>
                <div >
                  <button className="div-4" onClick={()=>{addInCart(i)}}>ADD TO CART</button>
                </div>
              </div>
            </div>
          </div>
            )
          }
          
        </div>
      </div>
    </div>
  );
};

export default ProductShow;
