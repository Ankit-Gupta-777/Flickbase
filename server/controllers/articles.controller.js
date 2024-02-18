const httpStatus = require('http-status');
const articlesServices = require('../services/articles.services');


const articlesController = {
    async createArticles(req,res,next){
        try{
            const articles = await articlesServices.addArticles(req.body);
            res.json(articles);
            
           

        }catch(error){
            console.log("Inside CATCH of CreateArticles function...");
            next(error);
            
        }
    },
    async getArticleById(req,res,next){
        try{
            const _id = req.params.id;
            const article = await articlesServices.getArticleById(_id,req.user);
            res.json(article);
            
        }catch(error){
            console.log("Inside CATCH of getArticleById function...");
            next(error);
            
        }
    },
    async updateArticleById(req,res,next){
        try{
            const _id = req.params.id;
            const article = await articlesServices.updateArticleById(_id,req.body);
            res.json(article);
            
        }catch(error){
            console.log("Inside CATCH of updateArticleById function...");
            next(error);
            
        }
    },
    async deleteArticleById(req,res,next){
        try{
            const _id = req.params.id;
            await articlesServices.deleteArticleById(_id);
            res.status(httpStatus.OK).json({
                action:"Deleted"
            });
            
        }catch(error){
            console.log("Inside CATCH of deleteArticleById function...");
            next(error);
            
        }
    },
    async getUserArticleById(req,res,next){
        try{
                const _id = req.params.id;
                const article = await articlesServices.getUserArticleById(_id);
                res.json(article);
            
        }catch(error){
            console.log("Inside CATCH of getUserArticleById function...");
            next(error);
            
        }
    },
    async getAllArticles(req,res,next){
        try{  
                
            const articles = await articlesServices.getAllArticles(req);
            res.json(articles);
            
        }catch(error){
            console.log("Inside CATCH of getAllArticles function...");
            next(error);
            
        }
    },
    async getMoreArticles(req,res,next){
        try{  
                
            const articles = await articlesServices.getMoreArticles(req);
            res.json(articles);
            
        }catch(error){
            console.log("Inside CATCH of getMoreArticles function...");
            next(error);
            
        }
    },
    async adminPaginate(req,res,next){
        try{  
            const articles = await articlesServices.paginateAdminArticles(req);
            res.json(articles);
                
            
        }catch(error){
            console.log("Inside CATCH of adminPaginate function...");
            next(error);
            
        }

    },
    async createCategory(req,res,next){
        try{
            const category = await articlesServices.addCategory(req.body);
            res.json(category);

        }catch(error){
            console.log("Inside CATCH of CreateCategory function...");
            next(error);
            
        }
    },
   

    async getAllCategories(req,res,next){
        try{
            const category = await articlesServices.findAllCategories();
            res.json(category);

        }catch(error){
            console.log("Inside CATCH of getAllCategories function...");
            next(error);
            
        }
    }
    


}
module.exports = articlesController;