import React, { useEffect, useState } from "react";
import axios from 'axios'; 
import {Routes,Route,BrowserRouter} from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";

import MainLayout from "./hoc/mainLayOut";
import Header from "./components/navigation/header";
import Home from "./components/home";
import Auth from "./components/auth";
import { isAuth } from "./store/actions/users";
import { Loader } from "./utils/tools";
import Article from "./components/articles/article";
import AccountVerify from "./components/auth/verification";

import Dashboard from "./components/dashboard";
import DashboardMain from "./components/dashboard/main";
import AuthGuard from "./hoc/authGuard";
import AdminArticles from "./components/dashboard/articles";
import AddArticles from "./components/dashboard/articles/edit_add/add";
import EditArticles from "./components/dashboard/articles/edit_add/edit";
import AdminCategories from "./components/dashboard/category";
import AdminProfile from "./components/dashboard/profile";



const Router = ()=>{
  let [loading,setLoading] = useState(true);
  const dispatch = useDispatch();
  const users = useSelector(state => state.users);


  useEffect(()=>{
    // console.log("from 1st useEffect of Routes.js");
    dispatch(isAuth());

  },[]);

  useEffect(()=>{
    // console.log("from 2nd useEffect of Routes.js");
    if(users.auth !== null){
      setLoading(()=>{
        console.log("from useEffect setLoading of Routes.js");
        loading = false;
      });
    }
  },[users]); 

  return (
    <BrowserRouter >

    {
      loading
      ?
      <Loader/>
      :
      <>
        <Header/>
        <MainLayout>
        <Routes>
          <Route path="/dashboard" element={
          <AuthGuard>
            <Dashboard/>
          </AuthGuard>
          
          }>
            <Route index  element={<DashboardMain/>}/>
            {
              //here INDEX attribute indicates that this route will be automatically called when the /dashboard will be called.
            }  
            <Route path="profile" element={<AdminProfile/>}/>
            <Route path="articles" element={<AdminArticles/>}/>
            <Route path="articles/add" element={<AddArticles/>}/>
            <Route  path="articles/edit/:articleId" element={<EditArticles/>}/>
            <Route path="categories" element={<AdminCategories/>}/>

          </Route>
          <Route path="/verification" element={<AccountVerify/>}/>
          <Route path="/auth" element={<Auth/>}/>
          <Route path="/articles/article/:id" element={<Article/>}/>
          <Route path="/" element={<Home/>}/>

        </Routes>
        </MainLayout>
      </>

    }
    </BrowserRouter>
  )

}

export default Router;