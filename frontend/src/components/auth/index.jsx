import {useFormik} from 'formik';
import { Component, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {useSelector,useDispatch} from 'react-redux';
import * as Yup from 'yup';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Loader ,errorHelper} from '../../utils/tools';

import { registerUser ,signInUser} from '../../store/actions/users';
import PreventSignIn from '../../hoc/preventSignIn';




const Auth = ()=>{
    const [register,setRegister] = useState(false);


    let navigate = useNavigate();
    const users = useSelector(state => state.users);
    const notifications = useSelector(state => state.notification);
    const dispatch = useDispatch();
    const formik = useFormik({
        initialValues:{
            email:'ankitsc0025@gmail.com',
            password:'sanjana777'
        },
        validationSchema:Yup.object({
            email:Yup.string().required('Email is Required').email('This is not a valid Email'),
            password:Yup.string().required('Password is Required')
        }),
        onSubmit:(values)=>{
            dohandleSubmit(values);
        }
    });


    const dohandleSubmit = (values)=>{
         if(register){
            dispatch(registerUser(values))

         }else{
            dispatch(signInUser(values));
         }  

    }

    useEffect(()=>{
        if(notifications && notifications.global.success){
            navigate('/dashboard');
        }


    },[notifications]);



    return (
        <PreventSignIn users={users}>
            <div className='auth_container'>
                <h1>Authenticate</h1>
                {
                    users.loading
                    ?
                    <Loader/>
                    :
                    <Box  sx={{
                        '& .MuiTextField-root':{
                            width:'100%',
                            marginTop:'20px'
                        }
                    }}
                    component="form"
                    onSubmit={formik.handleSubmit}
                    >
                        <TextField
                        name="email"
                        label="Enter Your Email"
                        variant="outlined"
                        {...formik.getFieldProps('email')}
                        {...errorHelper(formik,'email')}
                        />

                        <TextField
                        name="password"
                        label="Enter Your Password"
                        variant="outlined"
                        type='password'
                        {...formik.getFieldProps('password')}
                        {...errorHelper(formik,'password')}
                        />

                        <div className='mt-2'>
                            <Button
                            variant='contained' color='primary' type='submit' size='large'
                            >
                                {
                                    register?'Register':'LogIn'
                                }
                            </Button>
                            <Button
                             className='mt-3' variant='contained' color='secondary' size='small'
                             onClick={()=> setRegister(!register)} 
                            >
                                Want to  { !register?'Register':'LogIn' }
                            </Button>

                        </div>


                    </Box>

                }

            </div>
        
        </PreventSignIn>
    )
}

export default Auth;