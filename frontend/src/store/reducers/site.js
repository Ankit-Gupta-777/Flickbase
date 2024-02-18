import {createSlice} from "@reduxjs/toolkit";

 export const siteSlice = createSlice({
    name:'site',
    initialState:{
      layout:''
    },
    reducers:{
      setLayout:(state,actions)=>{
         state.layout = actions.payload;

      }

    }
 });
 export const {setLayout} = siteSlice.actions; 

 export default siteSlice.reducer;
 