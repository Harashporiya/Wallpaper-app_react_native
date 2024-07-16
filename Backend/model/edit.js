const {model, Schema} = require("mongoose")
const editSchema = new Schema({
    
   profileUserName:{
    type:String,
    required:false,
   },
   bio:{
    type:String,
    required:false,
   }

},{timestamps:true});

const Edit = model("Edit", editSchema);

module.exports = Edit;