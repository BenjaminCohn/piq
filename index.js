require("dotenv").config()
const express = require("express")
const app = express()
const cors = require("cors")
const port = 3000
const bodyParser = require("body-parser")




//Connection to database
require("./mongo")

//Controllers
const {createUser, logUser} = require("./controller/users")
const {getSauces, createSauce } = require("./controller/sauces")


//middleware
app.use(cors())
app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

const { authenticateUser} = require("./middleware/auth")
const multer = require("multer")
const storage = multer.diskStorage({destination: "images/", filename: makeFilename})
const upload = multer({storage: storage})


function makeFilename(req, file, cb){
    cb(null, Date.now() + "-" + file.originalname)
}


//Routes
app.post("/api/auth/signup", createUser)
app.post("/api/auth/login", logUser)
app.get("/api/sauces" ,authenticateUser, getSauces)
app.post("/api/sauces", authenticateUser,upload.single("image"),createSauce)
app.get('/', (req, res) => res.send("Hello"))

//listen
app.listen(port, ()=> console.log("Listening on port " + port))

