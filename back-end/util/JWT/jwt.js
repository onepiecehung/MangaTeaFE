import { JWT, CreateAuth } from "@k-will/core-authencation";
import UserModel from '../../database/mongo/model/user.model';
import { ROLE_ACCEPT_ADMIN_PAGE, ROLES } from "../../globalConstant";

export const jwt = new JWT({
  jwtKey: 'abc',
  expiredTime: 2592000000
});
/**
 * JWT User
 * */
export const isUser = new CreateAuth('user', jwt.getJWTKey(), 'jwt', async (token, done) => {
  try {
    let user = await UserModel.findOne({ _id: token._id, role: ROLES.USER }).lean();
    if (!user) {
      return done(null, false);
    }
    delete user.passWord;
    return done(null, user);
  } catch (e) {
    return done(e);
  }
});

/**
 * JWT Full Admin
 * */
export const isFullAdmin = new CreateAuth('fullAdmin', jwt.getJWTKey(), 'jwt', async (token, done) => {
  try {
    let isFullAdmin = await UserModel.findOne({ _id: token._id, role: { $in: ROLE_ACCEPT_ADMIN_PAGE } }).lean();
    if (!isFullAdmin) {
      return done(null, false);
    }
    delete isFullAdmin.passWord;
    return done(null, isFullAdmin);
  } catch (error) {
    return done(error)
  }
});

/**
 * JWT Admin
 * */
export const isAdmin = new CreateAuth('admin', jwt.getJWTKey(), 'jwt', async (token, done) => {
  try {
    let admin = await UserModel.findOne({ _id: token._id, role: { $in: [ROLES.ROOT, ROLES.ADMIN] } }).lean();
    if (!admin) {
      return done(null, false);
    }
    delete admin.passWord;
    return done(null, admin);
  } catch (error) {
    return done(error)
  }
});

/**
 * JWT Root
 * */
export const isRoot = new CreateAuth('root', jwt.getJWTKey(), 'jwt', async (token, done) => {
  try {
    let root = await UserModel.findOne({ _id: token._id, role: ROLES.ROOT }).lean();
    if (!root) {
      return done(null, false);
    }
    delete root.passWord;
    return done(null, root);
  } catch (error) {
    return done(error)
  }
});
/**
 * JWT Root
 * */
export const isFullAuth = new CreateAuth('fullAuth', jwt.getJWTKey(), 'jwt', async (token, done) => {
  try {
    let isFullAuth = await UserModel.findById(token._id).lean();
    if (!isFullAuth) {
      return done(null, false);
    }
    delete isFullAuth.passWord;
    return done(null, isFullAuth);
  } catch (error) {
    return done(error)
  }
});
