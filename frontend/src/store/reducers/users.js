import {createSlice} from "@reduxjs/toolkit";
import { registerUser,signInUser,isAuth,signOut,changeEmail,updateProfile} from "../actions/users";


let DEFAULT_USER_STATE = {
    loading:false,
    data:{
        _id:null,
        email:null,
        firstname:null,
        lastname:null,
        age:null,
        role:null,
        verified:null
    },
    auth:null

}
 export const usersSlice = createSlice({
    name:'users',
    initialState:DEFAULT_USER_STATE,
    reducers:{
        setVerify:(state,action)=>{
            state.data.verified = true;
        }

    },
    extraReducers:(builder)=>{
        builder
        //REGISTER
        .addCase(registerUser.pending,(state)=> {state.loading = true})
        .addCase(registerUser.fulfilled,(state,actions)=> {
            state.loading = false;
            state.data = actions.payload.data;
            state.auth = actions.payload.auth;
        })
        .addCase(registerUser.rejected,(state)=> {state.loading = false})

        //SIGNIN
        .addCase(signInUser.pending,(state)=> {state.loading = true})
        .addCase(signInUser.fulfilled,(state,actions)=> {
            state.loading = false;
            state.data = actions.payload.data;
            state.auth = actions.payload.auth;
        })
        .addCase(signInUser.rejected,(state)=> {state.loading = false})

        //ISATUH
        .addCase(isAuth.pending,(state)=> {state.loading = true})
        .addCase(isAuth.fulfilled,(state,actions)=> {
            state.loading = false;
            state.data ={...state.data,...actions.payload.data};
            state.auth = actions.payload.auth;
        })
        .addCase(isAuth.rejected,(state)=> {state.loading = false}) 

        //CHANGE EMAIL
        .addCase(changeEmail.pending,(state)=> {state.loading = true})
        .addCase(changeEmail.fulfilled,(state,actions)=> {
            state.loading = false;
            state.data = {...state.data,...actions.payload}
            // state.data.email = actions.payload.email;
            // state.data.verified = actions.payload.verified;
        })
        .addCase(changeEmail.rejected,(state)=> {state.loading = false}) 
         

        //SIGNOUT
        .addCase(signOut.fulfilled,(state)=> {
            state.data = DEFAULT_USER_STATE.data;
            state.auth = false;
        })

        //UPDATE PROFILE
        .addCase(updateProfile.fulfilled,(state,actions)=> {
            state.loading = false;
            state.data = {...state.data,...actions.payload};    
        })

        


        
    }
 });

 export const { setVerify } = usersSlice.actions; 

 export default usersSlice.reducer;
 