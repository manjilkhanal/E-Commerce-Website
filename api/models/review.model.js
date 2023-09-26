const {Schema, model} = require( "mongoose")

//const userSchema = new Schema({
    const Review = model('Review', new Schema({
        comment: {
            type: String,
            required: true,
        },
        rating: {
            type: Number,
            requred: true,
            min: 1,
            max:5,
        },
        user_id: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'users',
        },
        product_id: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'products',
        },
    },{
        timestamps: true,
        autoIndex: true,
        autoCreate: true, 
    }))
    

//const User = model('User', userSchema)
module.exports = Review