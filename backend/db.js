const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017/inotebook?readPreference=primary&ssl=false&directConnection=true";
// const mongoURI = "mongodb://localhost:27017/inotoebook//";


const connectToMongo = ()=>{
    mongoose.connect(mongoURI,()=>{
       console.log("connected to mongo successfully"); 
    })
}

module.exports = connectToMongo;