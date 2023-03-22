const {User} = require("../mongo")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

async function createUser(req, res){
    const {email, password} = req.body
    const hashedPassword = await hashPassword(password)
    const user = new User({email, password: hashedPassword})
 user
 .save()
 .then(() => res.status(201).send({message:"User register!"}))
 .catch((err) => res.status(409).send({message:"User n'est pas enregistré" + err}))
}


// cryptage du mot de passe qui se hash 10x
function hashPassword(password){
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds)
}

async function logUser(req, res){
    try{
   const {email, password} = req.body 
    const user = await User.findOne({ email: email })
    const isPasswordOk = bcrypt.compare(password, user.password)
    if (!isPasswordOk){
        res.status(403).send({message:" Mot de passe incorrect"})
    }
    const token = createToken(email)
    res.status(200).send({userId: user?.id, token: token})
}catch(err) {
    console.error(err)
    res.status(500).send({ message: " Erreur interne!"})
}}

function createToken(email) {
    const jwtPassword = process.env.JWT_PASSWORD
      return jwt.sign({email: email}, jwtPassword, {expiresIn: "24h"})  
}

//User.deleteMany({}).then(()=> console.log("Tout est supprimer !"))
module.exports = {createUser, logUser}