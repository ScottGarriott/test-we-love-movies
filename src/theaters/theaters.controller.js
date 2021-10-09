const theatersService = require("./theater.service")
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")
const { response } = require("express")

async function list(req, res, next) {
    //const { movieId } = req.params
    const data = await theatersService.list()
    //const byResult = movieId ? movie => movie
    res.json({ data })
}

module.exports = {
    list: [asyncErrorBoundary(list)],
}