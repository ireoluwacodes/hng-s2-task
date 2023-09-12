const express = require("express")
const { Create, Read, Update, Delete } = require("./controller")

const Router = express.Router()

Router.route("/").post(Create)
Router.route("/:id").get(Read)
Router.route("/:id").put(Update)
Router.route("/:id").delete(Delete)

module.exports = {
    Router
}