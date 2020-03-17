import User from '../../database/mongo/model/user.model';
import logger from "../../server/api/logger";
import cache from "memory-cache"
import { StringHelpers, ValidationHelpers } from '../../util/Helper';
import { CODE_ERROR } from "../../util/constants";
import APIError from "../../util/APIError";
import { jwt } from "../../util/JWT/jwt";
import { sendEmail } from "../../util/sendGird/index"
import {
  USER_STATUS, VERIFY_ACCOUNT, MIN_TIME_RESEND
} from "../../globalConstant";
import {
  TEMPLATE_REGISTRATION, TEMPLATE_VERIFY_EMAIL
} from "../../configs";
import fs from "fs"



/**
 * get code verify for register
 * @param options
 * @param options.userName
 * @param options.passWord
 * @param options.fullName
 * @param options.phoneNumber
 * @param options.email
 * @returns {Promise<*>}
 */

export async function sendCodeToSignUp(options) {
  try {
    let checkUsername = await User.findOne({
      userName: options.userName
    });
    if (checkUsername) {
      return Promise.reject(new APIError(401, [
        {
          msg: 'Username already exists',
          params: CODE_ERROR.USER_EXISTS
        }
      ]))
    }
    let checkEmail = await User.findOne({
      email: options.email
    });
    if (checkEmail == null) {
      //TODO check resend code register
      if (cache.get(`${options.email}`)) {
        let getDataJsonCache = JSON.parse(cache.exportJson(`${options.email}`))
        let msRemaining = getDataJsonCache[`${options.email}`].expire - new Date()
        let minRemaining = Math.floor((Math.floor(msRemaining / 1000)) / 60);
        let time_resend_later = MIN_TIME_RESEND - (VERIFY_ACCOUNT / 60000 - minRemaining);
        if ((VERIFY_ACCOUNT / 60000 - minRemaining) < MIN_TIME_RESEND) {
          return {
            time_unit: "min",
            resend_code: false,
            resend_later: time_resend_later,
            time_expire_old_verify_code: minRemaining
          }
        }
      }
      let verifyKey = StringHelpers.generateCode(6);
      await cache.put(`${options.email}`, verifyKey, VERIFY_ACCOUNT);
      await sendEmail(
        options.email,
        TEMPLATE_REGISTRATION,
        {
          fullName: options.fullName,
          verifyKey: verifyKey
        }
      );
      return true;
    } else {
      return Promise.reject(new APIError(401, [
        {
          msg: 'Email already exists',
          params: CODE_ERROR.EMAIL_EXISTS
        }
      ]))
    }
  } catch (error) {
    logger.error('error sendCodeToSignUp : ', error);
    return Promise.reject(new APIError(error.statusCode || 500, error.message || error.errors || 'Server Internal Error.'))
  }
}


/**
 * Register new user
 * @param options
 * @param options.userName
 * @param options.passWord
 * @param options.fullName
 * @param options.phoneNumber
 * @param options.email
 * @param options.verifyKey
 * @returns {Promise<*>}
 */

export async function SignUp(options) {
  try {
    if (options.verifyKey === cache.get(`${options.email}`)) {
      options.passWord = ValidationHelpers.createHash(options.passWord);
      let user = await User.create(options);
      cache.del(`${options.email}`);
      return user
    } else {
      return Promise.reject(new APIError(401, [
        {
          msg: 'Authentication code has expired',
          params: CODE_ERROR.AUTHENTICATION_CODE_REGISTER_HAS_EXPIRED
        }
      ]))
    }
  } catch (error) {
    logger.error('error SignUp : ', error);
    return Promise.reject(new APIError(error.statusCode || 500, error.message || error.errors || 'Server Internal Error.'))
  }
}


/**
 * LOGIN
 * @param options
 * @param options.userName
 * @param options.passWord
 * @returns {Promise<*>}
 */

export async function Login(options) {
  try {
    let user = await User.findOne({
      userName: options.userName
    });
    if (!user || user.status !== USER_STATUS.ACTIVE) {
      return Promise.reject(new APIError(404, [
        {
          msg: 'Not Found/Not Active',
          params: CODE_ERROR.USER_NOT_FOUND
        }
      ]))
    }
    if (ValidationHelpers.comparePassword(user.passWord, options.passWord)) {
      await User.findByIdAndUpdate({
        _id: user._id
      }, {
        online: true,
        login_last: new Date()
      })
      return {
        user: user,
        token: jwt.issue({
          _id: user._id
        }),
        expiredTime: jwt.getExpiredTime()
      }
    } else {
      return Promise.reject(new APIError(403, [
        {
          msg: 'Invalid UserName/Password',
          params: CODE_ERROR.PASSWORD_NOT_MATCH
        }
      ]))
    }
  } catch (error) {
    logger.error('error Login : ', error);
    return Promise.reject(new APIError(error.statusCode || 500, error.message || error.errors || 'Server Internal Error.'))
  }
}


/**
 * LOGOUT
 * @param options
 * @param options.user
 * @returns {Promise<*>}
 */

export async function Logout(options) {
  try {
    let logout = await User.findByIdAndUpdate({
      _id: options.user._id
    }, {
      online: false
    })
    if (logout) {
      // jwt.destroy(options.token)
      return true
    } else {
      return Promise.reject(new APIError(404, [
        {
          msg: 'Logging out failed',
          params: CODE_ERROR.USER_CANT_SIGNOUT
        }
      ]))
    }
  } catch (error) {
    logger.error('error Logout : ', error);
    return Promise.reject(new APIError(error.statusCode || 500, error.message || error.errors || 'Server Internal Error.'))
  }

}


/**
 *  Get user by token
 * @param options
 * @param options.user
 */

export async function getUserByToken(options) {
  try {
    return await User.getMetaDataUser(options.user)
  } catch (error) {
    logger.error('error getUserByToken : ', error);
    return Promise.reject(new APIError(error.statusCode || 500, error.message || error.errors || 'Server Internal Error.'))
  }
}


/**
 * Get user by id
 * @param options
 * @param options.id
 */

export async function getUserById(options) {
  try {
    let data = await User.findById({
      _id: options.id
    }).lean()
    await User.getMetaDataUser(data)
    delete data.passWord
    return data
  } catch (error) {
    logger.error('error getUserById : ', error);
    return Promise.reject(new APIError(error.statusCode || 500, error.message || error.errors || 'Server Internal Error.'))
  }
}


/**
 * @param options
 * @param options.user
 * @param options.phoneNumber
 * @param options.email
 * @param options.fullName
 */

export async function editUserByToken(options) {
  try {
    // return {
    //   1: options.params.id,
    //   2: options.user._id
    // }
    if (options.params.id == options.user._id) {
      await User.findByIdAndUpdate({
        _id: options.user._id
      }, options.change)
      return true
    } else {
      return Promise.reject(new APIError(404, [
        {
          msg: 'TOKEN ID AND PARMAS ID IS NOT DIFFERENT',
          params: CODE_ERROR.USER_ID_FAIL
        }
      ]))
    }
  } catch (error) {
    logger.error('error editUserByToken : ', error);
    return Promise.reject(new APIError(error.statusCode || 500, error.message || error.errors || 'Server Internal Error.'))
  }
}


/**
 * @param options
 * @param options.user
 */

export async function sendCodeToVerifyEmail(options) {
  try {
    let checkEmail = await User.findOne({
      email: options.user.email
    });
    if (checkEmail.verifyEmail === true) {
      return Promise.reject(new APIError(401, [
        {
          msg: 'Email has been confirmed',
          params: CODE_ERROR.EMAIL_CONFIRMED
        }
      ]))
    }
    let verifyKey = StringHelpers.generateCode(6);
    await cache.put(`${options.user.email}`, verifyKey, VERIFY_ACCOUNT);
    await sendEmail(
      options.user.email,
      TEMPLATE_VERIFY_EMAIL,
      {
        fullName: options.user.fullName,
        verifyKey: verifyKey
      }
    );
    return true;
  } catch (error) {
    logger.error('error sendCodeToVerifyEmail : ', error);
    return Promise.reject(new APIError(error.statusCode || 500, error.message || error.errors || 'Server Internal Error.'))
  }
}


/**
 * @param options
 * @param options.verifyKey
 * @param options.user
 */

export async function verifyEmailWithCode(options) {
  try {
    if (options.verifyKey === cache.get(`${options.user.email}`)) {
      await User.findByIdAndUpdate({
        _id: options.user._id
      }, {
        verifyEmail: true
      })
      cache.del(`${options.user.email}`);
      return true;
    }
    cache.del(`${options.user.email}`);
    return Promise.reject(new APIError(401, [
      {
        msg: 'Authentication code has expired',
        params: CODE_ERROR.AUTHENTICATION_CODE_REGISTER_HAS_EXPIRED
      }
    ]))
  } catch (error) {
    logger.error('error verifyEmailWithCode : ', error);
    return Promise.reject(new APIError(error.statusCode || 500, error.message || error.errors || 'Server Internal Error.'))
  }
}


/**
 * @param options
 * @param options.file
 * @param options.user
 */

export async function uploadAvatarForUser(options) {
  try {
    let data = await User.findByIdAndUpdate({
      _id: options.user._id
    }, {
      avatar: options.filename
    })
    if (!data) {
      fs.unlinkSync(`${options.path}`);
      return Promise.reject(new APIError(401, [
        {
          msg: 'USER CANT UPDATE AVATAR',
          params: CODE_ERROR.USER_CANT_UPDATE_AVATAR
        }
      ]))
    }
    return true
  } catch (error) {
    logger.error('error uploadAvatarForUser : ', error);
    return Promise.reject(new APIError(error.statusCode || 500, error.message || error.errors || 'Server Internal Error.'))
  }
}

/**
 * @param options
 * @param options.oldPassWord
 * @param options.newPassWord
 * @param options.user
 */

export async function changePassWord(options) {
  try {
    if (options.newPassWord === options.oldPassWord) {
      return Promise.reject(new APIError(404, [
        {
          msg: 'The new password does not match the old password',
          params: CODE_ERROR.CHECK_OLD_AND_NEW_PASSWORD
        }
      ]))
    }
    let user = await User.findOne({
      _id: options.user._id
    });
    if (!user || user.status !== USER_STATUS.ACTIVE) {
      return Promise.reject(new APIError(404, [
        {
          msg: 'Not Found/Not Active',
          params: CODE_ERROR.USER_NOT_FOUND
        }
      ]))
    }
    if (ValidationHelpers.comparePassword(user.passWord, options.oldPassWord)) {
      options.newPassWord = ValidationHelpers.createHash(options.newPassWord);
      await User.findByIdAndUpdate({
        _id: options.user._id
      }, {
        passWord: options.newPassWord
      })
      return true
    } else {
      return Promise.reject(new APIError(404, [
        {
          msg: 'Current password is incorrect.',
          params: CODE_ERROR.CURRENT_PASSWORD_IS_INCORRECT
        }
      ]))
    }
  } catch (error) {
    logger.error('error changePassWord : ', error);
    return Promise.reject(new APIError(error.statusCode || 500, error.message || error.errors || 'Server Internal Error.'))
  }
}