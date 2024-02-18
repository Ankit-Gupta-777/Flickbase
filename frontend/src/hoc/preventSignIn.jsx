import { useSelector } from "react-redux";
import { Navigate , useLocation } from "react-router-dom";
// import { showToast } from "../utils/tools";
// import toast from 'react-toastify';

const PreventSignIn = (props)=>{
    // const users = useSelector(state =>state.users);
    const location = useLocation();

    return(
        <>
            {
                props.users.auth
                ?
                <Navigate to="/dashboard" state={{from:location}} replace/>
                :
                props.children
            }
            {/* {
                // users.auth?showToast('SUCCESS',"Welcome Back"):null
              users.auth
              ?
              toast.success("Welcome Back",{
                position:"bottom-right"
                })
              :
              null
            } */}
        </>
    )


};


export default PreventSignIn;