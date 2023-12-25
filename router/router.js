const Router = require('express')
const router = new Router()
const controller = require('../controller/controller.js')


router.post('/creat_product', controller.creatPoduct)
router.post('/access_admin', controller.accessAdmin)
router.get('/findProduct', controller.findProduct)
router.post('/deleteProduct', controller.deleteProduct)
router.post('/updateProduct', controller.updateProduct)

module.exports = router