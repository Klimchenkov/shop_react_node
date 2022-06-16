const Router = require('express')
const ratingController = require('../controllers/ratingController')
const router = new Router()


router.post('/', ratingController.add)


module.exports = router