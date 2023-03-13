const express = require("express")
const app = express()
const cors = require("cors")
const port = 3000

//Connection to database
require("./mongo")

//Controllers
const {createUser} = require("./controller/users")

//middleware
app.use(cors())
app.use(express.json())

//Routes

app.post("/api/auth/signup",(req, res) => createUser)

app.get('/', (req, res) => res.send("Hello"))

//listen
app.listen(port, ()=> console.log("Listening on port " +port))

