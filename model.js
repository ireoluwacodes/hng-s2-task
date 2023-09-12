const mongoose = require('mongoose'); 

var userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
    },
});

const User = mongoose.model('User', userSchema);
module.exports = {
    User
}