const Formateur = require ('../models/Formateur')
const Formation = require ('../models/Formation')
const Condidat = require ('../models/Condidat')
const sessionFormation = require('../models/SessionFormation')

module.exports.addSession = async (req,res)=>{
    
    const {formateurId,formationId} = req.body
        try{
            const formation = await  Formation.findById(formationId);
            console.log(formation)
             if(!formation){
                 return res.status(400).json({message:"Aucune formation trouvée!"})
             }
             var condidatIds;
             if(formation.condidat!=[]) {
                condidatIds = formation.condidat;
             }
             else  res.json("defghjk");
            
             const  formateur = await Formateur.findById(formateurId)
             const  arrayFormation  = formateur.formations
             console.log(arrayFormation);
             var sessionFormateur ;
             arrayFormation.forEach(oneFormation=>{
                if(oneFormation.equals(formation._id)){
                   // console.log("sdfvgbn,")
                   sessionFormateur = formateur._id;
                }
                
            })
           // return res.json("erreur")
          const sessionformation = new sessionFormation ({
                formation  : formationId,
                condidat : condidatIds,
                formateur : sessionFormateur,
                date : req.body.date,
                heure_deb : req.body.heure_deb,
                heure_fin : req.body.heure_fin,
                
          })
            await sessionformation.save()

            res.status(201).send('Session added ');

    }catch(err){
        console.log(err);
        res.status(404).json({message :'Serveur Error'})

    }
}

module.exports.deleteSession = async ( req,res)=>{
    const {sessionId} = req.params
    try{
        const session =  sessionFormation.findById(sessionId)
        if(!session){
            res.status(404).json({message : 'Formation not found'})
        }
        await session.deleteOne()
        res.json('Fomation deleted')


    }catch(err)  {
        console.log(err)
        res.status(404).json({message:'Serveur Eroor'})
        
    }
}