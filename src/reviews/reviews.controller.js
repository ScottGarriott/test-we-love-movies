const reviewsService = require("./reviews.service")
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

async function read(req, res, next) {
    const { data } = await reviewsService.read(req.params.review_id)
    res.json({ data })
}

async function reviewExists(req, res, next) {
    const review = await reviewsService.read(req.params.reviewId)
    //console.log("-----> ", review)

    if(!!review){
        res.locals.review = review
        return next()
        //next does not necesarily end the function, so either return the next or make it an if else statement
    } else{
   return next({
        status: 404,
        message: "Review cannot be found."
    })
    }
} 

function hasMovieIdInPath(req, res, next) {
    console.log("params", req.params)
    if(req.params.movieId) {
        return next()
    }
    next({
        status: 404,
        message: "A movieId is required" 
    })
}

async function list(req, res, next) {
    const data = await reviewsService.list(req.params.movieId)
    console.log("Data ", data)
    res.json({ data })
}

async function destroy(req, res, next) {
    await reviewsService.delete(res.locals.review.review_id)
    res.sendStatus(204)
}

async function update(req, res, next) {
    //console.log("Updated")
    const updatedReview = {
        ...res.locals.review,
        ...req.body.data,
        review_id: res.locals.review.review_id
    }
     console.log("updated review ", updatedReview)
    const data = await reviewsService.update(updatedReview)
    res.status(200).json({ data })

}

module.exports = {
    delete: [
        asyncErrorBoundary(reviewExists), 
        asyncErrorBoundary(destroy)],
    update: [
        asyncErrorBoundary(reviewExists),
        asyncErrorBoundary(update)
    ],
    list: [
        hasMovieIdInPath, 
        asyncErrorBoundary(list)
    ],
    read: asyncErrorBoundary(read)
}

//where is the data coming from, is it the right type?
//are certain things firing, how is this supposed to run?
//how is the data being passed along, is it being saved?

//reconstruct the update and get paths

//why is the movieId being lost in the params, when logged it had no params