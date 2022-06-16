const Router = require('express')
const router = new Router()
const basketController = require("../controllers/basketController");

router.post('/', basketController.add)
router.get('/', basketController.getBasket)
router.delete('/', basketController.delete)
router.get('/check', basketController.checkBasket)


module.exports = router