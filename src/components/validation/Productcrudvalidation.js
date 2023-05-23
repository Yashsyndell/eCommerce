// Productcrudvalidation.js
import * as Yup from "yup";

const Productcrudvalidation =Yup.object({
    prdname:Yup.string().min(2).required("Please enter product name...."),
    details:Yup.string().min(5).required("Please enter product details...."),
    price:Yup.number().min(1).required("Please enter product price....")
})
   
export default Productcrudvalidation;