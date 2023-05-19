import * as Yup from "yup";
const passwordRules =  /^[0-9!@#$%^&*]{1,8}$/;
const Loginvalidation =Yup.object({
    email:Yup.string().email().required("Please enter email...."),
    pass:Yup.string().max(8,"Enter only 7 number and 1 special character").matches(passwordRules,"password should contain atleast 7 number and 1 special character").required("please enter password...")})

export default Loginvalidation;