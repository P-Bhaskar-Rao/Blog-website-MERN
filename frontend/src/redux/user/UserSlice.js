import {createSlice} from '@reduxjs/toolkit'

const initialState={
    currentUser:null,
    error:null,
    loading:false,

}

const userSlice=createSlice({
    name:'user',
    initialState,
    reducers:{
        signinStart:(state)=>{
            state.loading=true;
            state.error=null;
        },
        signinSuccess:(state,action)=>{
            state.currentUser=action.payload;
            state.loading=false;
            state.error=null
        },
        signinFail:(state,action)=>{
            state.error=action.payload
            state.loading=false
        },
        updateStart:(state,action)=>{
            state.error=null
            state.loading=true
        },
        updateSuccess:(state,action)=>{
            state.loading=false
            state.currentUser=action.payload
            state.error=null
        },
        updateFail:(state,action)=>{
            state.loading=false
            state.error=action.payload
        },
        deleteStart:(state,action)=>{
            state.loading=true;
            state.error=null;
        },
        deleteFail:(state,action)=>{
            state.loading=false;
            state.error=action.payload
        },
        deleteSuccess:(state,payload)=>{
            state.loading=false;
            state.error=null;
            state.currentUser=null;
        },
        signoutSuccess:(state,payload)=>{
            state.loading=false;
            state.currentUser=null
            state.error=null
        }
    }
})

export const {signinStart,signinSuccess,signinFail,updateStart,updateSuccess,updateFail,deleteFail,deleteStart,deleteSuccess,signoutSuccess}=userSlice.actions
export default userSlice.reducer