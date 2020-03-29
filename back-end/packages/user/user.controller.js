const response = require("../../util/response.json")
const UserValidator = require("./user.validation")
const UserService = require("./user.service")

export async function Register(req, res) {
    try {
        let validateResult = UserValidator.validateRegister(req.body);
        if (validateResult.error) {
            return response.error(res, req, {
                message: validateResult.error.details[0].message
            });
        }
        let data = await UserService.Register(req.body)
        return response.success(res, data)
    } catch (error) {
        return response.error(res, req, error)
    }
}


