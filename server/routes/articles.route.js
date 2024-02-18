const express = require('express');
const router = express.Router();
const articlesController = require('../controllers/articles.controller');
const auth = require('../middlewares/auth');
const {addArticleValidator} = require('../middlewares/articleValidation');

///////////////////////////////////////////////////////////////////////////ARTICLES ROUTES
router.post('/',auth('createAny','articles'),addArticleValidator,articlesController.createArticles);

router.route('/article/:id')
.get(auth('readAny','articles'),articlesController.getArticleById)
.patch(auth('updateAny','articles'),articlesController.updateArticleById)
.delete(auth('deleteAny','articles'),articlesController.deleteArticleById);

router.route('/users/article/:id')
.get(articlesController.getUserArticleById)

router.post('/admin/paginate',auth('readAny','articles'),articlesController.adminPaginate);

router.route('/all')
.get(articlesController.getAllArticles)
.post(articlesController.getMoreArticles)





/////////////////////////////////////////////////////////////////////////////////CATEGORIES


router.route('/categories')
.post(auth('createAny','categories'),articlesController.createCategory)
.get(auth('readAny','categories'),articlesController.getAllCategories)

module.exports = router;