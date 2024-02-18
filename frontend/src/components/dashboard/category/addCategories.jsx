import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import * as Yup from 'yup';
import { errorHelper } from "../../../utils/tools";
import { addCategory } from "../../../store/actions/aritcleThunk";
import {TextField,Button} from '@mui/material';


const AddCategory = ()=>{
    const dispatch = useDispatch();
    const formik = useFormik({
        enableReinitialize:true,
        initialValues:{
            name:''
        },
        validationSchema:Yup.object({
            name:Yup.string().required(" Category Name is Required")

        }),
        onSubmit:(values,{resetForm})=>{
            // console.log(values);
            dispatch(addCategory(values));
            resetForm();

        }
    });
    return(
        <>
            <form onSubmit={formik.handleSubmit}>
                <div className="form-group">
                    <TextField
                    style={{width:'100%'}}
                    name='name'
                    label="Enter Category Name"
                    variant="outlined"
                    {...formik.getFieldProps('name')}
                    {...errorHelper(formik,'name')}
                    />

                </div>
                <Button
                variant="contained"
                colort="primary"
                type="submit"
                >
                    Add Category
                     
                </Button>

            </form>
        </>
    )
}

export default AddCategory;