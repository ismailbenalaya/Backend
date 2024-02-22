const mongoose = require ('mongoose');
const Condidat = require('./Condidat');

var SchemaReview  = mongoose.Schema({
 formation : {
    type :  mongoose.Schema.Types.ObjectId ,
    ref :'Formation'

 },
 user : {
    type : mongoose.Schema.Types.ObjectId ,
    ref : 'Condidat'
 },
 message : {
    type : String
 } ,
 rating : {
    type : Number
 }

 });
 
module.exports =  mongoose.model('Review',SchemaReview) 