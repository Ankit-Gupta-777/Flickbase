import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { useDispatch } from "react-redux";
import { Loader,errorHelper } from "../../../../utils/tools";
import { TextField,Button,Stepper,Step,StepLabel } from "@mui/material";

import { changeEmail } from "../../../../store/actions/users";


 const EmailStepper = ({user,closeModal})=>{
    const [activeStep,setActiveStep] = useState(0);
    const steps = ['Enter Current Email','Enter New Email','Are You Sure?'];
    const dispatch = useDispatch();

    const formik = useFormik({
        enableReinitialize:true,
        initialValues:{
            email:'',
            newemail:''
        },
        validationSchema:Yup.object({
            email:Yup.string().required("This is Required").email("This is not a valid Email")
            .test('match',"Enter the Correct Email",(email)=>{
                return email === user.data.email ;
            }),
            newemail:Yup.string().required("This is Required").email("This is not a valid Email")
            .test('match',"Email is same,Please Enter a different Email",(newemail)=>{
                return newemail !== user.data.email ;
            }),
        }),
        onSubmit:(values)=>{
            console.log(values);
            dispatch(changeEmail(values))
            .unwrap()
            .then((response)=>{
                closeModal();
            })
        }
    })

    const handleNext = ()=>{
        setActiveStep(prevActiveStep =>prevActiveStep + 1);
    }
    const handleBack = ()=>{
        setActiveStep(prevActiveStep =>prevActiveStep -1 );
    }
    const nextBtn = ()=>(
        <Button className="mt-3" variant="contained" color="primary"
        onClick={handleNext}
        >
            Next

        </Button>
    )
    const backBtn = ()=>(
        <Button className="mt-3 me-2" variant="contained" color="primary"
        onClick={handleBack}
        >
            Back

        </Button>
    )

    return(
        <>
            {
                user.loading 
                ?
                <Loader/>
                : 
                <>
                    <Stepper activeStep={activeStep}>
                        {
                            steps.map(label=>(
                                <Step key={label}>
                                    <StepLabel>
                                            {label}
                                    </StepLabel>

                                </Step>

                            ))
                        }

                    </Stepper>
                    <form className="mt-3 stepper_form" onSubmit={formik.handleSubmit}>
                        {
                            activeStep === 0
                            ?
                             <div className="form-group">
                                <TextField
                                name="email"
                                style={{width:'100%'}}
                                label="Enter Your Current Email"
                                variant="outlined"
                                {...formik.getFieldProps('email')}
                                {...errorHelper(formik,'email')}
                                />
                                {
                                    formik.values.email && !formik.errors.email
                                    ?
                                    nextBtn()
                                    :
                                    null
                                }

                             
                             </div>
                            :
                            null
                        }
                         {
                            activeStep === 1
                            ?
                            <div className="form-group">
                            <TextField
                            name="newemail"
                            style={{width:'100%'}}
                            label="Enter Your New Email"
                            variant="outlined"
                            {...formik.getFieldProps('newemail')}
                            {...errorHelper(formik,'newemail')}
                            />
                            {
                                backBtn()
                            }
                            {
                                formik.values.newemail && !formik.errors.newemail
                                ?
                                nextBtn()
                                :
                                null
                            }

                         
                         </div>
                             
                            :
                            null
                        }
                         {
                            activeStep === 2
                            ?
                            <div className="form-group">
                                <Button 
                                className="mt-3 me-2"
                                variant="contained"
                                color="primary"
                                onClick={formik.submitForm}>
                                    Okay, Change My Email
                                </Button>
                                {backBtn()}

                            </div>
                             
                            :
                            null
                        }

                    </form>
                </>

            }
        </>
    )
 }

 export default EmailStepper;