const Admin = require('../models/Admin')
module.exports.addAdmin = async(req,res,next)=>{
    const {firstName,lastName,email,password} =  req.body
    try {
        const user = new  Admin({
            firstName,
            lastName,
            email,
            password

        })
        await user.save()
        console.log('Admin Added successfully');
        res.status(401).send('seccess')

    }catch(err){
        console.log(err)
        res.status(500).send('Internal Server Error')
    }

}