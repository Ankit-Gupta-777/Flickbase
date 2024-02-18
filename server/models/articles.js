const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const  aggregatePaginate = require('mongoose-aggregate-paginate-v2');
require('dotenv').config();


const articleSchema = mongoose.Schema({
    title:{
        type:String,
        maxlength:100,
        required:[true,'You Need a Title'],

    },
    content:{
        type:String,
        required:[true,'You Need Content'],
    },
    excerpt:{
        type:String,
        required:[true,'You Need Excerpt']
    },
    score:{
        type:Number,
        max:100,
        min:0,
        required:true

    },
    director:{
        type:String,
        required:true

    },
    actors:{
        type:[String],
        required:true,
        validate:{
            validator:function(array){
                return array.length >= 2;
            },
            message:"You must add atleast 2 Actors"
        }
    },
    status:{
        type:String,
        required:true,
        enum:['draft','public'],
        default:'public',
        index:true
    },
    category:{
        type:Schema.Types.ObjectId,
        ref:'Category',//using Category Collection from database...
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    }

});

articleSchema.plugin(aggregatePaginate);

const Article = mongoose.model('Article',articleSchema);

module.exports = { Article };