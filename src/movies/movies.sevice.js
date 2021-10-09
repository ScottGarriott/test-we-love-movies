const knex = require("../db/connection")

function list() {
    return knex("movies")
        .select("*")
}

async function listMoviesShowing() {
    return   knex("movies as m")
            .join("movies_theaters as mt", "mt.movie_id", "m.movie_id")
            .select("m.*", "mt.is_showing")
            .where("mt.is_showing", "true")
            .groupBy("m.movie_id", "mt.is_showing")
}

function read(movie_id) {
    return knex("movies").select("*").where({ movie_id }).first()
}

module.exports = {
    list,
    listMoviesShowing,
    read
}

//when the url for the request has the query is showing = true
//connect the movies and movies_theaters tables
//filter the movies by those that are showing
//can we filter the movies in the service and then pass the filtered movies to the controller?
//do we need a seperate function or can we put the filter logic in one list function?
//can you filter the results of a knex list query?