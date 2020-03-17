import mongoose from 'mongoose';
import { AVATAR_DEFAULT, ROLES, USER_STATUS } from '../../../globalConstant'
import logger from '../../../server/api/logger';
import { URL_AVATAR } from "../../../configs";

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, index: 1 },
  fullName: { type: String, required: true },
  userName: { type: String, required: true },
  passWord: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  status: { type: Number, enum: Object.values(USER_STATUS), default: USER_STATUS.ACTIVE },
  role: { type: String, enum: Object.values(ROLES), default: ROLES.USER },
  verifyPhone: { type: Boolean, default: false },
  verifyEmail: { type: Boolean, default: true },
  online: { type: Boolean, default: false },
  login_last: { type: Number },
  avatar: { type: String, default: AVATAR_DEFAULT },
  permission: [{ type: Number }],
  fromCountry: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Langauge',
    // default: "Unknown_ID"
  },
  appellation: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Appellation',
    // default: "Unknown_ID"
  }],
}, {
  timestamps: true
});

UserSchema.pre('save', function (next) {
  this.wasNew = this.isNew;
  next()
});

UserSchema.post('save', async function () {
  try {
    if (this.wasNew) {
      // new documents
    } else {
      // old documets
    }
    // elasticsearch
  } catch (error) {
    throw error;
  }
});

UserSchema.pre('remove', async function (next) {
  try {

  } catch (error) {
    logger.error('error remove : ', error);
    throw error;
  }
});

UserSchema.statics.getMetaDataUser = async function (users) {
  try {
    let isArray = Array.isArray(users);
    if (!isArray) {
      users = [users];
    }
    let promise = users.map(async e => {
      if (e.avatar) {
        e.avatar = {
          name: e.avatar,
          url: `${URL_AVATAR}/${e.avatar}`
        }
      }
      return e;
    });
    let data = await Promise.all(promise);
    return isArray ? data : data[0];
  } catch (error) {
    logger.error('error getMetaDataUser : ', error);
    throw error;
  }
}

export default mongoose.model('User', UserSchema);
