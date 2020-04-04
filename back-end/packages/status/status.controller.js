const response = require("../../util/response.json")
const StatusValidator = require("./status.validatation")
const StatusService = require("./status.service")




export async function create(req, res) {
    try {
        let validateResult = StatusValidator.validateCreateStatus(req.body);
        if (validateResult.error) {
            return response.error(res, req, {
                message: validateResult.error.details[0].message
            });
        }
        let data = await StatusService.create(req.body)
        return response.success(res, data, 201)
    } catch (error) {
        return response.error(res, req, error)
    }
}