var member = require("./member.model")

module.exports={
    create: async()=>{
        try {
            if (!req.body.user) {
                
            }
        } catch (error) {
            res.status(500).send({
                message: error.message || "Some error occurred while creating the new Genre.",
            });
        }
    }
}