import { ExpressValidation } from '@k-will/core-validation';
// import UserModel from '../../database/mongo/model/user.model';
const UserValidation = new ExpressValidation();

export const USER_LOGIN = UserValidation.validation({
  body: {
    userName: { type: 'String', required: true },
    passWord: { type: 'String', required: true },
  }
});

export const USER_REGISTER = UserValidation.validation({
  body: {
    userName: { type: 'String', required: true },
    fullName: { type: 'String', required: true },
    passWord: { type: 'String', required: true },
    email: { type: 'Email', required: true },
    phoneNumber: { type: 'String', required: true }
  }
});

export const USER_EDIT = UserValidation.validation({
  body: {
    fullName: { type: 'String' },
    email: { type: 'Email' },
    phoneNumber: { type: 'String' }
  }
});


export const USER_CHANGE_PASSWORD = UserValidation.validation({
  body: {
    oldPassWord: { type: 'String', required: true },
    newPassWord: { type: 'String', required: true }
  }
});

export const USER_FORGET_PASSWORD = UserValidation.validation({
  body: {
    email: { type: 'Email', required: true },
    userName: { type: 'String', required: true }
  }
});