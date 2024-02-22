const Formation = require("../models/Formation");
const Categorie = require("../models/Categorie");
const Formateur = require("../models/Formateur");
const Condidat = require("../models/Condidat");
const Review = require("../models/Review");

// Controller method to add a new formation
module.exports.addFormation = async (req, res, next) => {
  // Extract data from the request body
  const { nom, prix, cas, categorieId } = req.body;

  try {
    // Find the category by its ID
    const categorie = await Categorie.findById(categorieId);
    // If category not found, return an error
    if (!categorie) {
      return res.status(400).json({ error: "Category not found" });
    }

    // Create a new instance of Formation with the provided data
    const formation = new Formation({
      nom,
      prix,
      date_deb,
      date_fin,
      categorie: categorie._id,
      cas,
    });

    // Save the new formation
    await formation.save();
    console.log("Formation added successfully");
    res.status(201).send("success");
  } catch (err) {
    // Handle errors
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

// Controller method to delete a formation
module.exports.supprimerFormation = async (req, res) => {
  try {
    // Extract the formationId from request parameters
    const { formationId } = req.params;
    // Find the formation by its ID
    const formation = Formation.findById(formationId);
    // If formation not found, return an error
    if (!formation) {
      res.status(404).json({ message: "Formation not Found" });
    }
    // Delete the formation
    await formation.deleteOne();
    res.json({ message: "Formation deleted" });
  } catch (err) {
    // Handle errors
    console.log(err);
    res.status(500).json({ message: "Internal Server error" });
  }
};

// Controller method to get all formations for a formateur
module.exports.getFormationForFormateur = async (req, res) => {
  try {
    // Extract the formateurId from request parameters
    const { formateurId } = req.params;
    // Find the formateur by its ID and populate its formations
    const formateur = await Formateur.findById(formateurId).populate("formations");
    // If formateur not found, return an error
    if (!formateur) {
      res.status(404).json({ message: "Formateur not Found" });
    }
    // Extract formations from the formateur and send as response
    const formations = formateur.formations;
    res.json({ formations });
  } catch (err) {
    // Handle errors
    console.log(err);
    res.status(500).json({ message: "Error" });
  }
};

// Controller method to get all formations
module.exports.getAllFormation = async (req, res) => {
  try {
    // Find all formations
    const formations = await Formation.find();
    // Send formations as response
    res.json({ formations });
  } catch (err) {
    // Handle errors
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Controller method to add a review for a formation
module.exports.addReview = async (req,res)=>{
  try{
    // Extract user ID from request
    const userId = req.user._id;
    // Extract formation ID from request parameters
    const {formationId} = req.params;
    // Extract message and rating from request body
    const {message,rating} = req.body;
    // Find the formation by its ID
    const formation  = await Formation.findById(formationId);
    // If formation not found, return an error
    if(!formation){
      res.status(404).json({message:"Formation does not exist."})
    }
    // Create a new review instance
    const review = new Review({
      formation: formationId,
      user : userId,
      rating,
      message
    });
    // Save the review
    await review.save();
    // Push the review to the formation's reviews array
    formation.reviews.push(review);
    // Save the updated formation
    await formation.save();
    res.json('Review added');
  }catch(err){
      // Handle errors
      console.log(err);
      res.status(500).json('Server Error');
  }
}
module.exports.palning = async (req,res)=>{

}