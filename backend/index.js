const express = require("express")
const mongoose = require("mongoose")
const cors = require('cors')
 const RegisterModel=require('./models/Register')


const app = express();
app.use(cors())
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/hemraj");

app.post('/register', (req, res) => {
    const { name, email, password } = req.body;
    RegisterModel.findOne({ email: email })
        .then(user => {
            if (user) {
                //res.send(404).json("Already have an accound")
                res.status(400).send({status: false, message:"Alredy email exit",});
                
            } else {
                RegisterModel.create({ email: email, name: name, password: password })
                    .then(result => res.json("Account is created "))
                .catch(err=>res.json("err"))
            }
            
    }) .catch(err=>res.json(err))
})


app.listen(3001, () => {
    console.log("server is running ")
})