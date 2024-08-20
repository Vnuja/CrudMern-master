const mongoose = require('mongoose');

const cusschema = new mongoose.Schema({

    id:{
      type:String,
      required:true  
    },

    name:{
        type:String,
        required:true  
    },

    gender:{
        type:String,
        required:true  
    },

    phone:{
        type:String,
        required:true  
    }

});

module.exports = mongoose.model('Customer',cusschema);

