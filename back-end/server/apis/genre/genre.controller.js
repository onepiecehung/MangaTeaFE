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
    },
    delete: async (req, res) => {
        try {
            await Genre.findByIdAndDelete(
                {
                    _id: req.params.idGenre,
                },
                err => {
                    if (err) {
                        res.status(500).json({
                            success: false,
                            message: err.message || "Some thing error"
                            // data: result
                        });
                    }
                }
            );
            res.status(201).json({
                success: true,
                message: "Success delete a genre",
                // data: result
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message || "Some thing error"
                // data: result
            });
        }
    },
    update: async (req, res) => {
        try {
            if (!req.body.name) {
                return res.status(400).send({
                    message: "Name can not be empty",
                });
            }
            if (!req.body.detail) {
                let result = await Genre.findOneAndUpdate(
                    {
                        _id: req.params.idGenre,
                    },
                    {
                        name: req.body.name,
                        // detail: req.body.detail
                    }
                )
                if (!result) {
                    return res.status(404).json({
                        message: "Can not update genre",
                    });
                }
                return res.status(201).json({
                    success: true,
                    message: "Success update a genre",
                    data: result,
                });
            }

            let result = await Genre.findOneAndUpdate(
                {
                    _id: req.params.idGenre,
                },
                {
                    name: req.body.name,
                    detail: req.body.detail
                }
            );
            if (!result) {
                return res.status(404).json({
                    message: "Can not update genre",
                });
            }
            res.status(201).json({
                success: true,
                message: "Success update a genre",
                data: result,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message || "Some thing error"
                // data: result
            });
        }
    },
    getAllGenre: async (req, res) => {
        try {
            let result = await Genre.find()
            res.status(201).json({
                success: true,
                message: "Get all genre",
                data: result,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message || "Some thing error"
                // data: result
            });
        }
    },
    getGenreById: async (req, res) => {
        try {
            // console.log(req.params.idGenre)
            let result = await Genre.findById(req.params.idGenre)
            res.status(201).json({
                success: true,
                message: `Get genre by id: ${req.params.idGenre}`,
                data: result,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message || "Some thing error"
                // data: result
            });
        }
    },
}