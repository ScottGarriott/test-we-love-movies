const knex = require("../db/connection")

function list() {
    return knex("movies").select("*")
}

function read(movie_id) {
    return knex("movies").select("*").where({ movie_id }).first()
}

module.exports = {
    list
}