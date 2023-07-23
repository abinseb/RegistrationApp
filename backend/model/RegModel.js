const mongoose = require('mongoose');


const DevTSchema = new mongoose.Schema({
    Name:String,
    Email:String,
    District:String,
    MobNumber:Number,
    Institution:String,
    Gender:String,
    DOB:String,
    Category:String,
    InstitutionCategory:String,
    Year_sem_class:String,
    DepartmentDivision:String,
    TypeOfProof:String,
    Idcard:String,
    Photo:String
});
 var DevTmodel = mongoose.model("DevTReg",DevTSchema);
 module.exports = DevTmodel;