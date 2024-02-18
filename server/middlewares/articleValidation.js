const {check,validationResult} = require('express-validator');
const httpStatus = require('http-status');

const addArticleValidator = [
    check('title')
    .trim().not().isEmpty().withMessage('You need to give a title').bail().isLength({min:3}).withMessage("Atleast 3 characters are Required").bail(),
    check('director')
    .trim().not().isEmpty().withMessage("You need to give Name of the Director").bail()
    .not().isBoolean().withMessage("This cant be Boolean").bail()
    .isLength({min:3,max:100}).withMessage("Should be greater or lesser").bail(),

    (req,res,next)=>{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(httpStatus.BAD_REQUEST).json({
                errors: errors.array() 
            })
        }
        next();

    }
];

module.exports = {
    addArticleValidator
};