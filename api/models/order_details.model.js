const {Schema, model} = require( "mongoose")

//const userSchema = new Schema({
    const OrderDetails = model('OrderDetails', new Schema({
        product_id: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'products',
        },
        order_id: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'orders',
        },
        qty: {
            type: Number,
            required: true
        },
        price: {
            type: Number,
            required: true,
        },
        total: {
            type: Number,
            required: true,
        }
    },{
        timestamps: true,
        autoIndex: true,
        autoCreate: true, 
    }))
    

//const User = model('User', userSchema)
module.exports = OrderDetails