const router = require("express").Router()
const controller = require("./movies.controller")
const reviewsRouter = require("../reviews/reviews.router")
const theatersRouter = require("../theaters/theaters.router")
const methodNotAllowed = require("../errors/methodNotAllowed")

router.use('/:movieId/theaters', theatersRouter)

router.use("/:movieId/reviews", reviewsRouter)

router.route("/").get(controller.list).all(methodNotAllowed)
router.route("/:movieId").get(controller.read).all(methodNotAllowed)

module.exports = router