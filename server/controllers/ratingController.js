const { Sequelize } = require('../db')
const ApiError = require('../error/apiError')
const { Rating, Device } = require('../models/models')

class RatingController {

    async add (req, res, next) {
        try {
            const {userId, deviceId, rate} = req.body

            const rating = await Rating.findAll({where: {
                userId: userId, 
                deviceId:deviceId
            }})

            const get_avg_rating = async () => { 

                const deviceRating = await Rating.findAll({
                    where:{deviceId:deviceId},
                    attributes: [[Sequelize.fn('avg', Sequelize.col('rate')), "avgRate"]],
                    raw:true
                })

                const deviceUpdateRate = await Device.update({
                    // rating: (deviceRating[0].avgRate).charAt(0)
                    rating: deviceRating[0].avgRate
                },
                {
                    where:{
                        id:deviceId
                    }
                }) 

                return
            }
        
            if(!rating.length==0){

                const newRating = await Rating.update({
                    rate:rate,
                },
                {
                    where: {
                        userId: userId, 
                        deviceId:deviceId
                    }
                })

                const avg_rating = await get_avg_rating()

                return res.json(`Вы изменили оценку данного девайса на ${rate}`)
            }

            const newRating = await Rating.create({
                rate:rate,
                userId: userId, 
                deviceId:deviceId 
            })

            const avg_rating = await get_avg_rating()

            return res.json(`Вы проставили ${rate} данному девайсу`)

        } catch(e) {
            next(ApiError.badRequest(e))
        }
    }
}

module.exports = new RatingController()