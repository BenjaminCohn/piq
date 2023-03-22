     const jwt = require("jsonwebtoken")

     function authenticateUser(req, res, next){
        console.log("authenticate User")
         const header = req.header("Authorization")
         if (header == null) return res.status(403).send({message: "Invalide"})
         
        const token = header.split(" ")[1]
        if (token == null) return res.status(403).send({message: "token cannot be null"})
    
        jwt.verify(token, procces.env.JWT_PASSORD,(err, decoded) => {
            if (err)  return res.status(403).send({message:" token invalide" + err})
            console.log("le token est bien valid, let's, on continue !")    
            next()
        }) 
    }

module.exports = {authenticateUser}