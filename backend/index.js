const express = require('express');
const cors = require('cors');
const DevTRoutes = require('./routes/DevTRoutes');
const loginRoute = require('./routes/LoginRoute');
const mongoose = require('mongoose');


const app = new express();

mongoose.connect("mongodb+srv://abinseb09:abinseb09@cluster0.2xp4bal.mongodb.net/DevTDB?retryWrites=true&w=majority")
.then(()=>{
    console.log("Databse connected");
})
.catch(err=>console.log(err));


app.use(express.urlencoded({extended:true}))
app.use(express.json());
app.use(cors());


// routes
app.use(DevTRoutes);
app.use(loginRoute);



app.listen(3025,()=>{
    console.log("App is running in port 3025");
})

