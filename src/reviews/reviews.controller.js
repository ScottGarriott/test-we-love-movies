const reviewsService = require("./reviews.service")
const mehtodNotAllowed = require("../errors/methodNotAllowed")
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")
const methodNotAllowed = require("../errors/methodNotAllowed")
// const hasProperties = require("../errors/hasProperties")
// const hasRequiredProperties = hasProperties("score", "content")

// const VALID_PROPERTIES = [
//     "content",
//     "score",
//     "critic_id",
//     "movie_id"
// ]


// function hasOnlyValidProperties(req, res, next) {
//     const { data={} } = req.body

//     const invalidFields = Object.keys(data).filter((field) => {
//         !VALID_PROPERTIES.includes(field)
//     })

//     if(invalidFields.length > 0){
//         return next({
//             status:400,
//             message: `Invalid field(s): ${invalidFields.join(", ")}`
//         })
//     }
//     next()
// }

async function reviewExists(req, res, next) {
    const review = await reviewsService.read(req.params.reviewId)

    if(review){
        res.locals.review = review
        next()
    }
    next({
        status: 404,
        message: "Review cannot be found."
    })
} 

function hasMovieIdInPath(req, res, next) {
    if(req.params.movieId) {
        return next()
    }
    methodNotAllowed(req, res, next)
}

function noMovieIdInPath(req, res, next) {
    if(req.params.movieId) {
        return mehtodNotAllowed(req, res, next)
    }
}

async function list(req, res, next) {
    const data = reviewsService.list(req.params.movieId)
    res.json({ data })
}

async function destroy(req, res, next) {
    await reviewsService.delete(res.locals.review.review_id)
    res.sendStatus(204)
}

async function update(req, res, next) {
    const updatedReview = {
        ...req.locals.review,
        ...req.body.data,
        review_id: res.locals.review.review_id
    }

    const data = await reviewsService.update(updatedReview)
    res.status(200).json({ data })

}

module.exports = {
    delete: [
        noMovieIdInPath,
        asyncErrorBoundary(reviewExists), 
        asyncErrorBoundary(destroy)],
    update: [
        noMovieIdInPath,
        asyncErrorBoundary(reviewExists),
        asyncErrorBoundary(update)
    ],
    list: [hasMovieIdInPath, asyncErrorBoundary(list)],
}