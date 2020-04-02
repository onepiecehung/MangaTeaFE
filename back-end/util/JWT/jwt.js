const jwt = require("jsonwebtoken")
const response = require("../../util/response.json")
const { CONFIG } = require("../../globalConstant/index")
const { CODE } = require("../../globalConstant/error")

function getToken(headers) {
    if (headers && headers.authorization || headers['x-access-token']) {
        let token = headers.authorization || headers['x-access-token'];
        if (token.startsWith(`manga `)) {
            token = token.slice(6, token.length);
            return token
        } else {
            return token
        }
    } else {
        return null
    }
}

export async function Authentication(req, res, next) {
    let token = getToken(req.headers)
    if (token) {
        jwt.verify(token, CONFIG.jwt_encryption, (error, decoded) => {
            if (error) {
                return response.error(res, req, error, 403)
            } else {
                req.user = decoded
                next()
            }
        })
    } else {
        return response.error(res, req, CODE.TOKEN_HAS_EXPIRED, 403)
    }
}