const theatersService = require("./theater.service")
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")
const { response } = require("express")

async function list(req, res, next) {
    const data = await theatersService.list()
    res.json({ data })
}

module.exports = {
    list: [asyncErrorBoundary(list)],
}