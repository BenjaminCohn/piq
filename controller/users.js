const {User} = require("../mongo")

function createUser(req, res){
    
    //const email = req.body.email
    //const password = req.body.password
    const {email, password} = req.body
    const user = new User({email , password})
 user
 .save()
 .then((res) => res.send({message:"User register!"}))
 .catch((err) => console.log("User n'est pas enregistré", err))

}

module.exports = {createUser}