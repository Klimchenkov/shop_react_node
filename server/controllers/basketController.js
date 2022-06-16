const sequelize = require("../db")
const ApiError = require("../error/apiError")
const { Basket, BasketDevice, Device, Type, Brand } = require("../models/models")



class BasketController {
    async add (req, res, next) {
        try {
            const {userId, deviceId} = req.body
            const basket = await Basket.findOne({where:{userId}})
            const device = await Device.findOne({
                where: {id:deviceId},
                include: [{model: Brand, as: 'brand'}, {model: Type, as: 'type'}]
            })
            
            const basket_device = await BasketDevice.create({basketId: basket.id, deviceId})
            
            return res.json(`${device.type.name} ${device.brand.name} ${device.name} добавлен в корзину`)
        } catch(e) {
            next(ApiError.badRequest(e)) 
        } 
        
    }

    async checkBasket(req,res,next) {
        try {
            const {userId} = req.query
            const countBasket = await Basket.findAndCountAll({
                where: {userId},
                attributes:[],
                include: {model:BasketDevice},
                raw: true
            })
            if (countBasket.rows[0]["basket_devices.id"]===null){
                return res.json(0) 
            }
            return res.json(countBasket.count)
        } catch(e) {
            next(ApiError.badRequest(e)) 
        } 
    }

    async getBasket (req, res, next) { 
        try {
            const {userId} = req.query
            const basket = await Basket.findAll({
                where: {userId},
                include: [
                    {model: BasketDevice, attributes:["deviceId"], 
                        include:[{model: Device, as: 'device', attributes:[],
                                include:[{model:Type, as: 'type', attributes:[['name','typename']]},
                                         {model: Brand, as: 'brand', attributes:[["name","brandname"]]}]}]}],
                raw:true,
                attributes: [
                            "basket_devices.device.name", 
                            "basket_devices.device.price",
                            "basket_devices.device.rating",
                            "basket_devices.device.img",
                            
                            
                            
                             
                             sequelize.fn('count', sequelize.col("deviceId"))
            
                            ],
                group:[
                    "basket_devices.device.id",
                    "basket_devices.device.type.id",
                    "basket_devices.device.brand.id",
                    "basket_devices.device.name",
                    "basket_devices.device.price",
                    "basket_devices.device.rating",
                    "basket_devices.device.img",
                    "deviceId"
                    
                    
                 ]
                })

            const sum = await BasketDevice.findAll({
                    include: [{model: Basket,
                                    where: {userId},
                                    attributes:[]
                                },
                            {model: Device,
                                attributes: []}],
                    attributes: [sequelize.fn('sum', sequelize.col("price"))],
                    raw:true
                    
                })
                        

            return res.json([basket,sum[0]["sum"]]) 
        } catch(e) {
            next(ApiError.badRequest(e))
        }
    }


    async delete (req,res,next) {
        try {
            const {userId, deviceId} = req.query
            if(deviceId) {

                const basket_device = await Basket.findAll({
                    where: {
                        userId: userId,
                    },
                    include: {
                        model: BasketDevice,
                        where: {
                            deviceId: deviceId
                        },
                        attributes:["id"]
                    },
                    attributes:[]
                })

                if(basket_device[0]){
                    const removed = await BasketDevice.destroy({
                        where: {
                            id: basket_device[0].basket_devices[0].id
                        }
                    })
                    return res.json("Девайс удалён из корзины")
                }

                return res.json("В корзине больше нет такого девайса")

            }
            else {
                const basket = await Basket.findOne({
                                            where:{
                                                userId: userId
                                            }
                                        })
                const deleted = await BasketDevice.destroy({
                                                    where:{
                                                        basketId:basket.id  
                                                    }
                                                })
                return res.json("Корзина очищена")
            }
            } catch(e) {
                next(ApiError.badRequest(e))
            }
    } 

}

module.exports = new BasketController() 