const mongoos = require ('mongoose');

var SchemaCategorie  = mongoos.Schema({
    nom : {
        type :String,
        unique : true
    },

    description :{
        type:String,
    }
});
module.exports =  mongoos.model('categorie',SchemaCategorie) 