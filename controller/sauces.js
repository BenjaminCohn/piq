const { json } = require("body-parser")
const mongoose = require("mongoose")


const productSchema = new mongoose.Schema({
 userId: String,
 name : String ,
 manufacturer : String ,
 description : String ,
 mainPepper : String ,
 imageUrl : String ,
 heat : Number ,
 likes : Number ,
 dislikes : Number ,
 usersLiked : [String],
 usersDisliked : [String ]
})
const product = mongoose.model("product", productSchema)

function getSauces(req,res){
    console.log("Le token à été validé, donc nous sommes dans get sauces")
    authenticateUser(req,res)
        //console.log("le token est bon", decoded)
        product.find({}).then(products => res.send(products))
        //res.send({message: [{sauce: "sauce1"}, {sauce:"sauce1"} ]})  
}

function createSauce(req,res){
    const sauce = json.parse (req.body.sauce)
  
    const {name, manufacturer, description, mainPepper, heat,  userId} = sauce
   
    console.log ("sauce:", sauce)
    console.log({file: req.file })
    const imageUrl = req.file.destination + req.file.filename
    console.log("imageUrl:", imageUrl)

    
    const product = new product({
        userId,
        name ,
        manufacturer ,
        description ,
        mainPepper ,
        imageUrl ,
        heat ,
        likes : 0,
        dislikes : 0,
        usersLiked : [],
        usersDisliked : []
    })
    console.log("product:", product)
    product.save().then((res) => console.log("produit sauvegarder", res)).catch(console.error)
}
module.exports = { getSauces, createSauce}