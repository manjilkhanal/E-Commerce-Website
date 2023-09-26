const {Cms} = require('../../controllers')
const express = require('express')

const router = express.Router()

router.route('/')
    .get(Cms.Brands.index)
    .post(Cms.Brands.store)

router.route('/:id')
    .get(Cms.Brands.show)
    .patch(Cms.Brands.update)
    .put(Cms.Brands.update)
    .delete(Cms.Brands.destroy)


module.exports = router