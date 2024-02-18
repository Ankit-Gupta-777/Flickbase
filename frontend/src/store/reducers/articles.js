import {createSlice} from "@reduxjs/toolkit";
import {
   getCategories,
   addArticle,
   getPaginateArticles,
   changeArticleStatus,
   homeLoadMore,
   getArticle}
 from "../actions/aritcleThunk";



 export const articlesSlice = createSlice({
    name:'articles',
    initialState:{
      homeSort:{
         sortby:"_id",
         order:"desc",
         limit:8,
         skip:0
      },
      loading:false,
      articles:[],
      categories:[],
      current:null
    },
    reducers:{
      updateCategories:(state,action)=>{
         state.categories = action.payload;
      }

    },
    extraReducers:(builder)=>{
      builder
      //GET CATEGORY
      .addCase(getCategories.fulfilled,(state,actions)=>{
         state.categories = actions.payload;
      })
      //ADD ARTICLE
      .addCase( addArticle.pending,(state,actions)=>{ state.loading = true})
      .addCase( addArticle.fulfilled,(state,actions)=>{
         state.loading = false;
         state.lastAdded = actions.payload;

      })
      .addCase( addArticle.rejected,(state,actions)=>{  state.loading = false})
      //GET PAGINATE ARTICLES

      .addCase( getPaginateArticles.pending,(state,actions)=>{ state.loading = true})
      .addCase( getPaginateArticles.fulfilled,(state,actions)=>{
         state.loading = false;
         state.adminArticles = actions.payload;

      })
      .addCase( getPaginateArticles.rejected,(state,actions)=>{  state.loading = false})

      //STATUS CHANGE
      .addCase( changeArticleStatus.fulfilled,(state,actions)=>{
         state.loading = false;
         state.adminArticles.docs = actions.payload;

      })

      //HOME LOAD MORE

      .addCase( homeLoadMore.fulfilled,(state,actions)=>{
         state.homeSort.skip = actions.payload.sort.skip;
         state.articles = actions.payload.newState; 

      })
      //GET ARTICLE
      .addCase(getArticle.pending,(state,actions)=>{state.loading = true;})
      .addCase( getArticle.fulfilled,(state,actions)=>{
         state.loading = false;
         state.current = actions.payload; 

      })






    }
 });


 export const { updateCategories } = articlesSlice.actions;
 export default articlesSlice.reducer;
 