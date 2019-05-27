const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var fs = require('fs');


//createing loaction schema
const GeoSchema = new Schema({

    type : {
        type: String,
        default: "point"
    },

    coordinates: {
        type: [Number],
        index: "2dsphere"
    },
})


//creating ninja schema

const NinjaSchema = new Schema({

    name: {
        type: String,
        required: [true, "name fields is required"]
    },
    vote: {
        type: String,
    },
    availability: {
        type: Boolean,
        default: false
    },
     image: {
      type: String,
     // required: true
     },
    // img: { data: Buffer, contentType: String },
    //geo loactions
    geometry: GeoSchema
})

//Ninja is the model //ninja is collection in db //NinjaSchema is object 
const Ninja = mongoose.model('ninja',NinjaSchema);
module.exports = Ninja;