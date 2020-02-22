var Genre = require("./genre.model")

module.exports = {
    create: async (req, res) => {
        try {
            if (!req.body.name) {
                return res.status(400).send({
                    message: "Name can not be empty",
                });
            }
            let newGenre = {
                index: req.body.index,
                name: req.body.name,
                detail: req.body.detail
            }
            let createNewGenre = await Genre.create(newGenre)
            res.status(201).json({
                success: true,
                message: "Success create a new Genre",
                data: createNewGenre,
            });
        } catch (error) {
            if (error && error.name === "ValidationError") {
                let err_msg = error.message
                    .toString()
                    .replace("Lesson validation failed: ", "")
                    .split(", ");
                return res.status(400).json({
                    success: false,
                    message: err_msg,
                });
            }
            res.status(500).send({
                message: error.message || "Some error occurred while creating the new Genre.",
            });
        }
    }
}