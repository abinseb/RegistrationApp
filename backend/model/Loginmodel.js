const mongoose = require('mongoose');

const LoginSchema = new mongoose.Schema({
    user_id:String,
    password:String
});
 var LoginModel = mongoose.model("LoginYIP",LoginSchema);
 module.exports = LoginModel;