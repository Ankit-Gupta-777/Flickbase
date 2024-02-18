import { createAsyncThunk } from '@reduxjs/toolkit';
import {errorGlobal,successGlobal} from '../reducers/notifications';
import { getAuthHeader } from '../../utils/tools';
import { updateCategories } from '../reducers/articles';
import axios from 'axios';



export const addArticle = createAsyncThunk(
    'articles/addArticle',
    async(article,{dispatch})=>{
        try{
            const request = await axios.post('/api/articles',article,getAuthHeader());
            dispatch(successGlobal("Post Created"));
            return request.data;

        }catch(error){
            dispatch(errorGlobal(error.response.data.message));
            throw error;
        }
    }
); 

export const getAdminArticle = createAsyncThunk(
    'articles/getAdminArticle',
    async(_id,{dispatch})=>{
        try{
            const request = await axios.get(`/api/articles/article/${_id}`,getAuthHeader());
            // dispatch(successGlobal("Post Created"));
            return request.data; 

        }catch(error){
            dispatch(errorGlobal(error.response.data.message));
            throw error;
        }
    }
); 
export const updateArticle = createAsyncThunk(
    'articles/updateArticle',
    async({values,articleId},{dispatch})=>{
        try{
            // const request = await axios.get(`/api/articles/article/${_id}`,getAuthHeader());
            await axios.patch(`/api/articles/article/${articleId}`,values,getAuthHeader());
            dispatch(successGlobal("Article Updated"));
            // return request.data; 
            return true;

        }catch(error){
            dispatch(errorGlobal(error.response.data.message));
            throw error;
        }
    }
); 

export const getPaginateArticles = createAsyncThunk(
    'articles/getPaginateArticles',
    async({page=1,limit=4,keywords=''},{dispatch})=>{
        try{
            const request = await axios.post('/api/articles/admin/paginate',{
                page,
                limit,
                keywords
            },getAuthHeader());
            return request.data;

         }catch(error){
            dispatch(errorGlobal(error.response.data.message));
            throw error;

        }
    }

)

export const changeArticleStatus = createAsyncThunk(
    'articles/changeArticleStatus',
    async({newStatus,id},{dispatch,getState})=>{
        try{
            const request = await axios.patch(`/api/articles/article/${id}`,{
                status:newStatus
            },getAuthHeader());

            let article = request.data;
            //previous state

            let state = getState().articles.adminArticles.docs;
            let position = state.findIndex(article => article._id === id); 

            //we can't mutate let state here so we have to make an alias

            const newState = [...state];
            newState[position] = article;

            dispatch(successGlobal("Status Changed"));

            return newState;

         }catch(error){
            dispatch(errorGlobal(error.response.data.message));
            throw error;

        }
    }

)

export const removeArticles = createAsyncThunk(
    'articles/removeArticles',
    async(_id,{dispatch,getState})=>{
        try{
            await axios.delete(`/api/articles/article/${_id}`,getAuthHeader()); 
            dispatch(successGlobal("Article Removed"));

            let page =  getState().articles.adminArticles.page;
            dispatch(getPaginateArticles({page}));

            return true;


        }catch(error){
            dispatch(errorGlobal(error.response.data.message));
            throw error;
        }
    }
);

export const getCategories = createAsyncThunk(
    'articles/getCategories',
    async(obj,{dispatch})=>{
        try{
            const request = await axios.get('/api/articles/categories',getAuthHeader());
            return request.data;

        }catch(error){
            dispatch(errorGlobal(error.response.data.message));
            throw error;
        }
    }
);


export const addCategory = createAsyncThunk(
    'articles/addCategory',
    async(data,{dispatch,getState})=>{
        try{
            const category = await axios.post('/api/articles/categories',data,getAuthHeader());

            let state  = getState().articles.categories;
            let prevState = [...state];
            let newState = [...prevState,category.data];
            dispatch(updateCategories(newState));
            // dispatch(getCategories(newState));  
            dispatch(successGlobal("Category Added"));

            return newState;

        }catch(error){
            dispatch(errorGlobal(error.response.data.message));
            throw error;
        }
    }
);

export const homeLoadMore = createAsyncThunk(
    'articles/homeLoadMore',
    async(sort,{dispatch,getState})=>{
        try{
            const article = await axios.post(`/api/articles/all`,sort);
            const state = getState().articles.articles;
            const prevState = [...state];

            const newState = [...prevState,...article.data];

            return {newState,sort};
           

        }catch(error){
            dispatch(errorGlobal(error.response.data.message));
            throw error;
        }
    }
);

export const getArticle = createAsyncThunk(
    'articles/getArticles',
    async(id,{dispatch})=>{
        try{
            const request = await axios.get(`/api/articles/users/article/${id}`);
            return request.data;
           
           

        }catch(error){
            dispatch(errorGlobal(error.response.data.message));
            throw error;
        }
    }
);

