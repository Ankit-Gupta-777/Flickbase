import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {Loader} from '../../utils/tools';
import { useEffect } from 'react';

import { accountVerify } from '../../store/actions/users';


const AccountVerify = ()=>{
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [search,setSearch] = useSearchParams();
    const token = search.get('t');

    useEffect(()=>{
        if(token){
            dispatch(accountVerify(token))
            .unwrap()
            .finally(()=>{
                navigate('/');  
            })

        }else{
            navigate('/');
        }

    },[dispatch,navigate]);

    return(
        <>
        <Loader/>
        
        </>
    )
}
export default AccountVerify;