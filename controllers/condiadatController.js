const Condidat = require("../models/Condidat");
const nodemailer = require("nodemailer");
const Formation = require("../models/Formation");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const Token = require("../models/TokenCondidat");

// Create a nodemailer transporter
var transport = nodemailer.createTransport({
  service: "Gmail",
  secure: false,
  auth: {
    user: "mohamedbenalaya76@gmail.com",
    pass: "qmpmgraaxwpaklvw",
  },
});

// Controller method to handle user signup
module.exports.signup = async (req, res, next) => {
  try {
    // Create a new Condidat instance with request body data
    let user = new Condidat({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      sexe: req.body.sexe,
      email: req.body.email,
      password: req.body.password,
      date_nais: req.body.date_nais,
      adress: req.body.adress,
      phone: req.body.phone,
    });

    // Save the new user
    await user.save();

    // Generate and save a new token for user confirmation
    const token = Condidat.token = crypto.randomBytes(16).toString("hex")


    // Construct confirmation link
    const link = `http://localhost:2700/condidat/confirmation/${token}`;

    // Send verification email
    await verifEmail(user.email, link);

    res.status(200).json({
      message:
        "Your account has been created. Please confirm your registration.",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server error" });
  }
};

// Function to send verification email
const verifEmail = async (email, link) => {
  try {
    var message = {
      from: "from@gmail.com",
      to: email,
      subject: "Welcome",
      html: `<p>Welcome to Intelect Academy!</p><p>If you have any questions or need assistance, feel free to contact us.</p><p>Thank you and happy exploring!</p><br><a href="${link}">Click here to activate your account</a>`
    };
    transport.sendMail(message, (err, info) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  } catch (e) {
    console.log("error");
  }
};

// Controller method to confirm user account
module.exports.confirmacount = async(req,res)=>{
  const userId = req.body.id;
  try {
   token = req.query.token
    // Update user's verified status
    const user = await Condidat.findOneAndUpdate({userId}, {$set: { "verified" : true}});
    res.status(201).json({message : "Account verified"});
  } catch (err) {
    console.log(err);
    res.status(404).json({message: 'Error'});
  }
}

// Controller method to handle user enrollment in a formation
module.exports.InscriptioFormation = async (req, res) => {
  try {
    const { condidatId, formationId } = req.params;

    // Check if the condidat is already enrolled in the formation
    const condidat = await Condidat.findById(condidatId);
    if (!condidat) {
      res.status(404).json({ message: "Condidat not found " });
    }

    const formation = await Formation.findById(formationId);
    if (!formation) {
      res.status(404).json({ message: "Formation not found " });
    }

    if (condidat.formations.includes(formation)) {
      return res.status(409).json({
        message: "This condidat is already linked with this formation",
      });
    }

    // Enroll the condidat in the formation
    condidat.formations.push(formation);
    await condidat.save();

    res.status(201).json({ message: "Formation enrollment successful" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};

// Controller method to handle user unenrollment from a formation
module.exports.DesnscriptioFormation = async (req, res) => {
  try {
    const { condidatId, formationId } = req.params;

    // Check if the condidat is enrolled in the formation
    const condidat = await Condidat.findById(condidatId);
    if (!condidat) {
      res.status(404).json({ message: "Condidat not found " });
    }

    const formation = await Formation.findById(formationId);
    if (!formation) {
      res.status(404).json({ message: "Formation not found " });
    }

    if (!condidat.formations.includes(formation)) {
      return res.status(409).json({
        message: "This condidat is not linked with this formation",
      });
    }

    // Unenroll the condidat from the formation
    condidat.formations.pull(formation);
    await condidat.save();

    res.status(201).json({ message: "Formation unenrollment successful" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};

// Controller method to handle password reset
module.exports.forgetPassword = async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await Condidat.findOne({ email });

    if (!user) {
      res.status(404).json({ message: "Condidat not found " });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;

    // Save the updated password
    await user.save();

    // Send email notification about password change
    var message = {
      from: "from@gmail.com",
      to: req.body.email,
      subject: "Bienvenue",
      html: "Your password is Updated Successfully",
    };
    transport.sendMail(message, (err, info) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    res.status(201).json({ message: "Password changed" });
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: "Server error" });
  }
};
