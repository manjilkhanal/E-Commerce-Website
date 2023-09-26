const  {Schema, model} = require("mongoose")

//const userSchema = new Schema({
    const Brand = model('Brand', new Schema({
        name: {
            type: String,
            required: true,
        },
        
        status: {
            type: Boolean,
            required: true,
            default: true,
        }
    },{
        timestamps: true,
        autoIndex: true,
        autoCreate: true, 
    }))
    

//const User = model('User', userSchema)
module.exports = Brand