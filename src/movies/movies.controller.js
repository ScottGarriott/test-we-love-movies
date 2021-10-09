const moviesService = require("./movies.sevice")
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")

async function movieExists(req, res, next) {
    const movie = await moviesService.read(req.params.movieId)
    if(movie) {
        res.locals.movie = movie
        next()
    }
    next({ status: 404, message: `Movie can not be found`})
}

async function list(req, res, next) {
    const query = req.query
    console.log(query)
    if(query.is_showing === "true") {
        console.log("QUERY")
        const data = await moviesService.listMoviesShowing()
        console.log("data", data.length)
        res.json({ data })
    }else{
        console.log("NOT QUERY")
        const data = await moviesService.list()
        res.json({ data })
    }
}

async function read(req, res, next) {
    const  { movie: data }  = res.locals
    res.json({ data })
}

module.exports = {
    list: [asyncErrorBoundary(list)],
    read: [asyncErrorBoundary(movieExists), asyncErrorBoundary(read)],
    movieExists: asyncErrorBoundary(movieExists)
}