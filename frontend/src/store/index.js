import { configureStore } from "@reduxjs/toolkit";

import UsersReducer from './reducers/users';
import SiteReducer from  './reducers/site';
import NotificationReducer from './reducers/notifications';
import ArticlesReducer from './reducers/articles';


export const store = configureStore({
    reducer:{
        users:UsersReducer,
        site:SiteReducer,
        notification:NotificationReducer,
        articles:ArticlesReducer
    }
});