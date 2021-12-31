const express = require('express')
const { discountController } = require('../../controllers')
const { discountValidation } = require('../../validations')
const validate = require('../../../middlewares/validate')

const router = express.Router()

router.post('/add', validate(discountValidation.discountSchema), discountController.add)
router.get('/', discountController.list)
router.get('/:key', discountController.search)
router.get('/edit/:id', discountController.view)
router.put('/edit/:id', discountController.edit)
router.delete('/:id', discountController.deletes)

module.exports = router
