const Categorie = require('../models/Categorie');
const categorie  = require ('../models/Categorie')
module.exports.add = (req,res,next)=>{
    try{
    let user = new categorie ({
        nom : req.body.nom,
        description : req.body.description
})
user.save();    
res.status(201).send('success');
if ((err)=> {
    console.log(err);
})
    console.log('Categorie added succesfuly ');

    }catch(err){
        console.log(err);
    }
}
module.exports.getAll= async(req, res) => {
    try{        
        const categorie = await Categorie.find();
        res.json({categorie})
    }catch(err){
        console.log(err)
        res.status(500).json({message: 'Internal server error'});
    }
}
