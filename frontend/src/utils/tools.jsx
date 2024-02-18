import  CircularProgress  from "@mui/material/CircularProgress";
import {toast} from 'react-toastify';
import cookie from 'react-cookies';

export const errorHelper = (formik,value) => ({
        error:formik.errors[value] && formik.touched[value] 
        ?true
        :false,
        helperText: formik.errors[value] && formik.touched[value] 
        ?
        formik.errors[value]
        :
        null


    }
);

export const Loader = ()=>{
    return(
        <div className="root_loader">
            <CircularProgress/>
        
        </div>
    )
}
export const showToast = (type,msg)=>{

    switch(type){

        case 'SUCCESS':
            toast.success(msg,{
                position:"bottom-right",
                autoClose:1000
            });
            break;
        case 'ERROR':
            toast.error(msg,{
                position:"bottom-right",
                autoClose:1000
            });
            break;
        default:
            return false;
    }

}

export const getTokenCookie = ()=> cookie.load('x-access-token');
export const removeTokenCookie = ()=> cookie.remove('x-access-token',{path:'/'});
export const getAuthHeader = ()=>{
    return { headers:{
            'Authorization':`Bearer ${getTokenCookie()}`
        }
    }
}

export const AdminTitle = ({title})=>{
    return(
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap  align-items-center pb-2  mb-3 border-bottom">
            <h1 className="h2">
                {
                    title
                }
            </h1>

        </div>
    )
}