const httpStatus = require('http-status');
const { Category } = require('../models/categories');
const { Article } = require('../models/articles');
const {ApiError} = require('../middlewares/apiError');


/////////////////////////////////////////////////////////////////////////ARTICLES

const addArticles = async(body)=>{
   try{
      const article = new Article({
         ...body,
         score:parseInt(body.score)
      });
      await article.save();
      return article;


   }catch(error){
      throw error;
   }
}


const getArticleById = async(_id,user)=>{
   try{

      if(user.role === "user"){
         throw new ApiError(httpStatus.BAD_REQUEST,"Sorry you don't have enough Rights","from the get ARTICLE BY ID ARTICLE USER DON'T HAVE ENOUGH RIGHTS ");
      }

      const article = await Article.findById(_id).populate('category');
      if(!article)
      {
         throw new ApiError(httpStatus.NOT_FOUND,"Article Not Found","from the get ARTICLE BY ID ARTICLE NOT FOUND");
      }
     
   return article;


   }catch(error){
      throw error;
   }
}

const updateArticleById = async(_id,body)=>{
   try{
      const article = await Article.findOneAndUpdate(
         {_id:_id},
         {
            "$set":body
         },
         {new:true}
       ).populate('category');
       if(!article)
       {
         throw new ApiError(httpStatus.NOT_FOUND,"Article not Found","from UPDATE ARTICLE BY ID  Article NOT Found");
       }
     
   return article;


   }catch(error){
      throw error;
   }
}

const deleteArticleById = async(_id)=>{
   try{
      const article = await Article.findByIdAndDelete(_id); 

      if(!article)
      {
        throw new ApiError(httpStatus.NOT_FOUND,"Article not Found","from Delete ARTICLE BY ID  Article NOT Found");
      }
     
      return true;


   }catch(error){
      throw error;
   }

}

const getUserArticleById = async(_id)=>{
   try{
      const article = await Article.findById(_id).populate('category'); 

      if(!article)
      {
        throw new ApiError(httpStatus.NOT_FOUND,"Article not Found","from getUserArticleById  Article NOT Found");
      }
      if(article.status === "draft"){
         throw new ApiError(httpStatus.BAD_REQUEST,"Sorry you are not ALLOWED","from getUserArticleById  user CAN'T ACCESS is DRAFT");
      }
     
      return article;


   }catch(error){
      throw error;
   }
}

const getAllArticles = async(req)=>{
   try{
       //  /sortby=_id&order=desc&limit=3

      const sortby = req.query.sortby || "_id";
      const order =  req.query.order || "desc";
      const limit =  req.query.limit || 2;

      const articles = await Article
      .find({status:'public'})
      .populate('category') //populate has to be before sort otherwise it will not work...
      .sort([
         [sortby,order]
      ])
      .limit(parseInt(limit));

      if(!articles)
      {
        throw new ApiError(httpStatus.NOT_FOUND,"Articles not Found","from getAllArticles  Articles NOT Found");
      }
     
      return articles;


   }catch(error){
      throw new ApiError(httpStatus.NOT_FOUND,"Articles not Found","from getAllArticles  Articles NOT Found");
      // throw error;
   }

}

const getMoreArticles = async(req)=>{
   const sortby = req.body.sortby || "_id";
   const order =  req.body.order || "desc";
   const limit =  req.body.limit || 3;
   const skip = req.body.skip || 0;

   try{
      const articles = await Article
      .find({status:'public'})
      .populate('category') //populate has to be before sort otherwise it will not work...
      .sort([
         [sortby,order]
      ])
      .skip(skip)
      .limit(parseInt(limit));

      if(!articles)
      {
        throw new ApiError(httpStatus.NOT_FOUND,"Articles not Found","from getAllArticles  Articles NOT Found");
      }
     
      return articles;


   }catch(error){
      throw error;
   }

}

const paginateAdminArticles = async(req)=>{
   try{
      const aggQueryArray = [];
      if(req.body.keyword && req.body.keyword != "" ){
         const re = new RegExp(`${req.body.keyword}`,'gi');  
         aggQueryArray.push(
            {$match:{title:{$regex:re}}}
         );

      }
      ////////////////////////////////////////////////////////////////////////////////Categories
      aggQueryArray.push(
         {
            $lookup:{
               from:'categories',
               localField:'category',
               foreignField:'_id',
               as:'category'
            }
         },
         {
            $unwind:"$category"
         }
      );

      let aggQuery = Article.aggregate(aggQueryArray);
      const limit = req.body.limit? req.body.limit:5 ;
      const options = {
         page:req.body.page,
         limit:limit,
         sort:{_id:'desc'}
      }

      const articles = await Article.aggregatePaginate(aggQuery,options);
      return articles;

   }catch(error){

   }

}


/////////////////////////////////////////////////////////////////////////CATEGORIES
const addCategory = async (body)=>{
   try{
      //Validation
      const category = new Category({
         ...body
      });
      await category.save();
      return category;

   }catch(error){
    console.log('Inside CATCH of addCategory Function...Inside ARTICLES SERVICES.');
    throw error;
   }
}

const findAllCategories = async ()=>{
   try{
      const categories = await Category.find();
      return categories;

   }catch(error){
     throw error;
   }

}

module.exports = {
   addArticles,
   getArticleById,
   updateArticleById,
   deleteArticleById,
   getUserArticleById,
   getAllArticles,
   getMoreArticles,
   paginateAdminArticles,
   addCategory,
   findAllCategories
};