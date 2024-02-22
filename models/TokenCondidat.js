const mongoose = require ('mongoose')
var SchemaToken = mongoose.Schema({
  userId : {
    type : mongoose.Schema.Types.ObjectId ,
    ref : 'Condidat'
  },
 
});
module .exports = mongoose.model('token',SchemaToken);
