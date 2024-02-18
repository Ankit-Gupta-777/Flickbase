import { useEffect } from 'react';
import {useDispatch, useSelector } from 'react-redux';
import  { Link,useNavigate,useLocation } from 'react-router-dom';
import SideDrawer from './sideNavigation';
import { clearNotification } from '../../store/reducers/notifications';
import { signOut } from '../../store/actions/users';
import { showToast } from '../../utils/tools';
import { setLayout } from '../../store/reducers/site';


const Header = ()=>{
    const users = useSelector(state => state.users);
    const site = useSelector(state => state.site);
    const notifications = useSelector(state => state.notification );
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let location = useLocation();

    useEffect(()=>{
        let pathname = location.pathname.split('/');
        // console.log(pathname);
        if(pathname[1] === 'dashboard'){
            dispatch(setLayout('dash_layout'));
        }else{
            dispatch(setLayout(''));
        }

    },[location.pathname,dispatch]);

    useEffect(()=>{
        let { global } = notifications;
        if(notifications && global.error){
            const msg = global.msg? global.msg : 'Error';
            showToast('ERROR',msg);
            // console.log(msg);
            dispatch(clearNotification());

        }
        if(notifications && global.success){
            const msg = global.msg? global.msg : 'Success';
            showToast('SUCCESS',msg);
            // console.log(msg);
            dispatch(clearNotification());
            
        }

    },[notifications]);
    const signOutUser = ()=>{
        dispatch(signOut());
        navigate("/");
    };
    return(
        <>
            {
                !users.data.verified && users.auth 
                ?
                <div className='not_verified'>
                Not Verified
                 
                </div>
              
                :
               
                 null
                
            }
            <nav className={`navbar fixed-top ${site.layout}`}>
                <Link to="/" className='navbar-brand d-flex align-items-center fredoka_ff'>
                Flickbases
                </Link>
                <SideDrawer users={users} signOutUser={signOutUser}/>

            </nav>
        </>
    )
}

export default Header;