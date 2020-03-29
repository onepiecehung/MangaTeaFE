const UserRepository = require("../repository/user.repository")
const logger = require("../../util/logger")
const { USER_ERROR } = require("../../globalConstant/index")

export async function Register(userInfo) {
    try {
        let UserEmail = await UserRepository.findEmail(userInfo.email)
        if (UserEmail.length > 0) {
            return Promise.reject(USER_ERROR.EMAIL_HAS_EXISTS);
        }
        let UserUserName = await UserRepository.findUsername(userInfo.username)
        if (UserUserName.length > 0) {
            return Promise.reject(USER_ERROR.USERNAME_HAS_EXISTS);
        }
        let data = await UserRepository.create(userInfo)
        return data
    } catch (error) {
        logger.error(error);
        return Promise.reject(error);
    }
}