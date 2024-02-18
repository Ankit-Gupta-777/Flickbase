import { useFormik } from "formik";
import { useDispatch,useSelector } from "react-redux";
import { errorHelper } from "../../../utils/tools";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import * as Yup from "yup";

import { updateProfile } from "../../../store/actions/users";



const UserProfile = ()=>{
    const { firstname, lastname , age} = useSelector(state=>state.users.data); 
    const dispatch = useDispatch();
    const formik = useFormik({
        enableReinitialize:true,
        initialValues:{
            firstname,
            lastname,
            age
        },
        validationSchema:Yup.object({
            firstname:Yup.string().required("This is Required")
        }),
        onSubmit:(values)=>{
            // console.log(values);
            dispatch(updateProfile(values));
        }
    })
    return (
        <>
        <form className="mt-3 article_form" style={{maxWidth:'250px'}}
        onSubmit={formik.handleSubmit}
        >
            <div className="form-group">
                <TextField
                style={{width:'100%'}}
                name="firstname"
                label="Enter Your Firstname"
                variant="outlined"
                {...formik.getFieldProps('firstname')}
                {...errorHelper(formik,'firstname')}
                />

            </div>
            <div className="form-group">
                <TextField
                style={{width:'100%'}}
                name="lastname"
                label="Enter Your Lastname"
                variant="outlined"
                {...formik.getFieldProps('lastname')}
                {...errorHelper(formik,'lastname')}
                />

            </div>
            <div className="form-group">
                <TextField
                style={{width:'100%'}}
                name="age"
                label="Enter Your Age"
                variant="outlined"
                {...formik.getFieldProps('age')}
                {...errorHelper(formik,'age')}
                />

            </div>
            <Button
            className="mt-3"
            variant="contained"
            color="primary"
            type="submit"
            >
                Edit Profile

            </Button>


        </form>
        </>
    )
}
export default UserProfile; 