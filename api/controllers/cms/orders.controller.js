const { mongoose} = require('mongoose')
const {showError} = require('../../lib')
const {Order} = require('../../models')
const { OrderDetails} = require('../../models')
class OrdersController {
    index = async(req, res, next) =>{
        try{
            const orders = await Order.aggregate([
                
                {$lookup: {from: 'users', localField: 'user_id',
            foreignField: '_id', as: 'user'}}
            ]).exec()
            let result = []

            for(let order of orders){
                let details = await OrderDetails.aggregate([
                    {$match: {order_id: new mongoose.Types.ObjectId(order._id)}},
                    {$lookup: {from: 'products', localField: 'product_id',
                foreignField: '_id', as: 'product'}}
                ]).exec()

                details = details.map(detail => {
                    return {
                        _id: detail._id,
                        order_id: detail.order_id,
                        product_id: detail.product_id,
                        qty: detail.qty,
                        price: detail.price,
                        total: detail.total,
                        product: detail.product[0],
                        createdAt: detail.createdAt,
                        updatedAt: detail.updatedAt,
                        __v: detail.__v,
                    }
                   })
          
           result.push({
                _id: order._id,
                user_id: order.user_id,
                status: order.status,
                details:details,
                user: order.user[0],
                createdAt: order.createdAt,
                updatedAt: order.updatedAt,
                __v: order.__v,
           })
        }
    
    res.json(result)
        }catch(err){
            showError(err, next)
        }
    }

    update = async(req, res, next) =>{
        try{
            const{status} = req.body

            await Order.findByIdAndUpdate(req.params.id, {status})
            res.json({
                success: "Order updated."
            })
        }catch (err){
            showError(err, next)
        }
    }
    
    destroy = async(req, res, next) =>{
        try{

            await OrderDetails.deleteMany({order_id: req.params.id})
           
            await Order.findByIdAndDelete(req.params.id)
            res.json({
                success: "Order removed."
            })
        }catch (err){
            showError(err, next)
        }
    }
}

module.exports = new OrdersController