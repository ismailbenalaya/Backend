// Importation du modèle de Formateur
const Formateur = require ('../models/Formateur');
const Formation = require('../models/Formation');
// Importation des modules nécessaires
// Importation nodemailer pour envoyer les email
var nodemailer = require('nodemailer');
// Configuration du service d'envoi d'email (Gmail dans cet exemple)
var transport  = nodemailer.createTransport({
    service: 'Gmail',
    secure: false,
    auth: {
        user:"mohamedbenalaya76@gmail.com",
        pass: "qmpmgraaxwpaklvw"
    }
});

// Définition de la fonction signUp qui sera exportée comme middleware
module.exports.signup =  async (req, res, next) => {
    try {
        const{originalname,buffer,mimetype} = req.file;
        
        // Création d'une nouvelle instance de Formateur avec les données du corps de la requête
        let user = new Formateur({
            firstName:req.body.firstName,
            lastName : req.body.lastName,
            sexe:req.body.sexe,
            email:req.body.email,
            password:req.body.password, 
            date_nais:req.body.date_nais,
            adress:req.body.adress,
            phone:req.body.phone,
            cv:{
                filename:originalname,
                data:buffer,
                contentType: mimetype,
            }
            
        
        })
        console.log(req.file);
        await user.save();
        res.status(201).send('success');
        var message = {
            from: "from@gmail.com",
            to: req.body.email,
            subject: 'Bienvenue',
            html : "<p>Bienvenue à Intelect Academy!</p><p>Nous sommes ravis de vous accueillir dans notre académie intellectuelle. Nous sommes impatients de partager des connaissances et des expériences enrichissantes avec vous.</p><p>Si vous avez des questions ou avez besoin d'aide, n'hésitez pas à nous contacter.</p><p>Merci et bonne exploration!</p>"
        };
        transport.sendMail(message, (err, info) => {
            if (err) {
                console.log(err);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
               
     

    } catch (err) {
      console.error(err);
      res.status(500).json({error:'Internal Serveur error'});
      
    }
};
module.exports.updateStatus = async (req,res)=> {
    const {email} = req.params;
    const {status} = req.body;
    try{
        const formateur = await Formateur.findOneAndUpdate({email},
            {$set: { "status" : status}});
     /*   if(!formateur){
            return res.status(404).json({message : 'Formateur not found'})
    }
    formateur.status= status;*/
    //await formateur.save();
    await sendMail(formateur.email,'Status Update','Your status has been Updates to '+status+' Please check your account') ;
    res.json({message : "Statue updated succesfully"})


}catch(err){
    console.log(err)
    res.status(500).json({message : 'Internal  Server Error'})
}
}
async function sendMail(to,subject,text){
    const mailOptions = {
        from : "mohamedbenalaya76@gmail.com",
        to ,
        subject,
        text
    };
    try{
        await transport.sendMail(mailOptions)
        console.log('email sent to '+to)


    }catch(err){
        console.err('Error sending email to ${to} :',err)
        throw err;
    }
}
module.exports.affectationFormationFormateur = async (req,res) =>{
    try{    
        const {formateurId,formationId} = req.body
        const formateur = await Formateur.findById(formateurId);
        if(!formateur){
            return res.status(404).json({message : 'formateur not found'})

        }
        const formation = await Formation.findById(formationId);
        if(!formation){
            return res.satuts(404).json({message : 'formation not found'})
        }
        if (formateur.formations.includes(formationId)){
            return res.status(409).json({message:'This formateur is already linked with this formation'});
        }
        //on ajoute la formation au tableau des formations du formateur et on enregistre les modifications dans le document de base de données
        formateur.formations.push(formationId);
        await formateur.save();
        res.json({message :'formation affected'});

    }catch(err){
        console.log(err);
        res.status(500).json({message : 'Serveur Error '})    
    }
}
module.exports.supprimerFormateur = async(req,res)=>{
    try{
        const {formateurId} = req.params;
        const formateur = Formateur.findById(formateurId)
        if(!formation){
            res.status(404).json({message : 'Formation not Found'})
        }
        await formateur.deleteOne();
        res.json({message :'formation supprimee'});
    }
    catch(err)
    {
        console.log(err);
        res.status(500).json({message :'Internal Server error'});

    }
}


module.exports.getAllFormateur = async(req,res)=>{
    try{        
        const formateur = await Formateur.find();
        res.json({formateur})
    }catch(err){
        console.log(err)
        res.status(500).json({message: 'Internal server error'});
    }
}
module.exports.forgetPassword = async (req, res) => {
    const { email, password } = req.body;
    try {
      let user = await Formateur.findOne({ email });
  
      if (!user) {
        res.status(404).json({ message: "Formateur not found " });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
      await user.save();
      res.status(201).json({ message: "Password changed" });
      var message = {
        from: "from@gmail.com",
        to: req.body.email,
        subject: "Bienvenue",
        html: "Your password is Updated Succesfully",
      };
      transport.sendMail(message, (err, info) => {
        if (err) {
          console.log(err);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
    } catch (err) {
      console.log(err);
      res.status(404).json({ message: "serveur erreur" });
    }
  };