const controller = require("./reviews.controller")
const router = require("express").Router({mergeParams: true})
const methodNotAllowed = require("../errors/methodNotAllowed")


router.route("/").get(controller.list).all(methodNotAllowed)

router.route("/:reviewId")
    .delete(controller.delete)
    .put(controller.update)
    .get(controller.read)
    .all(methodNotAllowed)

module.exports = router