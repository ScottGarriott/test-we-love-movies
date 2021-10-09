const knex = require("../db/connection")

function readCritic(critic_id) {
    return knex("critics").where({ critic_id }).first()
}

async function setCritic(review) {
    review.critic = await readCritic(review.critic_id)
    return review
}

function list(movie_id) {
    return knex("reviews")
        .select("*")
        .where({ movie_id })
        .then((reviews) => Promise.all(reviews.map(setCritic)))
        
}

function read(reviewId) {
    return knex("reviews")
        .select("*")
        .where({ review_id: reviewId })
        .first()
}

function destroy(reviewId) {
    return knex("reviews"). where({ review_id: reviewId }).first().del()
}

function update(updatedReview) {
    return knex("reviews")
        .select("*")
        .where({ review_id: updatedReview.review_id })
        .update(updatedReview, "*")
        .then(() => read(review.review_id))
        .then(setCritic)
}

module.exports = {
    list,
    read,
    delete: destroy,
    update
}