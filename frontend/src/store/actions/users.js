import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {errorGlobal,successGlobal} from '../reducers/notifications';
import { getAuthHeader,removeTokenCookie } from '../../utils/tools';
import { setVerify } from '../reducers/users';


export const registerUser = createAsyncThunk(
    'users/registerUser',
    async({email,password},{dispatch})=>{
        try{
            const request = await axios.post('/api/auth/register',{
                email:email,
                password:password
            });
             //show Message

             dispatch(successGlobal('Welcome to Flickbase.Please check your Email'));
            return {data:request.data.user,auth:true};      

        }catch(error){
            dispatch(errorGlobal(error.response.data.message));
            throw error;

        }
    }
);

export const signInUser = createAsyncThunk(
    'users/signInUser',
    async({email,password},{dispatch})=>{
        try{
            const request = await axios.post('/api/auth/signin',{
                email:email,
                password:password
            });

            //show Message
            dispatch(successGlobal('Welcome back to Flickbase'));
            return {data:request.data.user,auth:true};  

        }catch(error){
            dispatch(errorGlobal(error.response.data.message));
            throw error;

        }
    }
);

export const isAuth = createAsyncThunk(
    'users/isAuth',
    async()=>{
        try{
            const request = await axios.get('/api/auth/isauth',getAuthHeader());
            console.log("Inside TRY block of isAuth Function.");
            return {data:request.data,auth:true};
        }catch(error){
            console.log("Inside CATCH block of isAuth Function.");
            return {data:{},auth:false}
            // throw error;

        }
    }
);

export const signOut = createAsyncThunk(
    'users,signOut',
    async()=>{
        removeTokenCookie();
    }
)

export const accountVerify = createAsyncThunk(
    'users/accountVerify',
    async(token,{dispatch,getState})=>{
        try{
            const user =  getState().users.auth;
            await axios.get(`/api/users/verify?validation=${token}`);

            if(user){
                dispatch(setVerify());
            }
            dispatch(successGlobal("Account Verified"));

        }catch(error){
            dispatch(errorGlobal(error.response.data.message));
            throw error;
        }
    }
)

export const changeEmail = createAsyncThunk(
    'users/changeEmail',
    async(data,{dispatch})=>{
        try{
           const request = await axios.patch('/api/users/email',{
            email:data.email,
            newemail:data.newemail
           },getAuthHeader());
           dispatch(successGlobal("Email Updated,Please check your Email"));
           return{
                email:request.data.user.email,
                verified:false
           }

        }catch(error){
            dispatch(errorGlobal(error.response.data.message));
            throw error;
        }
    }
);

export const updateProfile = createAsyncThunk(
    'users/updateProfile',
    async(data,{dispatch})=>{
        try{
            const profile =  await axios.patch('/api/users/profile',data,getAuthHeader());
            dispatch(successGlobal("Profile updated"));
            return {
                firstname:profile.data.firstname,
                lastname:profile.data.lastname,
                age:profile.data.age
            }

        }catch(error){
            dispatch(errorGlobal(error.response.data.message));
            throw error;
        }
    }
);


