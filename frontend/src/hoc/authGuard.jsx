import { useSelector } from "react-redux";
import {useLocation,Navigate} from 'react-router-dom';
import { showToast } from "../utils/tools";


const AuthGuard = (props)=>{
    const users = useSelector(state => state.users);
    const location = useLocation();
    if(!users.auth){
        showToast('ERROR',"Sorry You are not Authorised");  
        return <Navigate to="/"  state={{from:location}} replace/>
    }

    return props.children;

};

export default AuthGuard;