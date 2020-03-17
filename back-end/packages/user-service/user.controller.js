import * as UserService from './user.service';

export async function SignUp(req, res) {
  try {
    let options = req.body;
    let data = await UserService.sendCodeToSignUp(options)
    return res.RH.success(data);
  } catch (error) {
    return res.RH.error(error);
  }
}

export async function VerifySignUp(req, res) {
  try {
    let options = req.body;
    let data = await UserService.SignUp(options);
    return res.RH.success(data);
  } catch (error) {
    return res.RH.error(error);
  }
}

export async function Login(req, res) {
  try {
    let options = req.body;
    let data = await UserService.Login(options);
    return res.RH.success(data);
  } catch (error) {
    return res.RH.error(error);
  }
}

export async function Logout(req, res) {
  try {
    let options = req.body;
    options.user = req.user;
    let data = await UserService.Logout(options);
    return res.RH.success(data);
  } catch (error) {
    return res.RH.error(error);
  }
}

export async function getUserByToken(req, res) {
  try {
    let options = req.body;
    options.user = req.user;
    let data = await UserService.getUserByToken(options);
    return res.RH.success(data);
  } catch (error) {
    return res.RH.error(error);
  }
}

export async function getUserById(req, res) {
  try {
    let options = req.params;
    let data = await UserService.getUserById(options);
    return res.RH.success(data);
  } catch (error) {
    return res.RH.error(error);
  }
}

export async function editUserByToken(req, res) {
  try {
    let options = {}
    options.change = req.body;
    if (options.change.email) {
      options.change.verifyEmail = false;
    }
    options.user = req.user;
    options.params = req.params;
    let data = await UserService.editUserByToken(options);
    return res.RH.success(data);
  } catch (error) {
    return res.RH.error(error);
  }
}

export async function sendCodeToVerifyEmail(req, res) {
  try {
    let options = req.body;
    options.user = req.user;
    let data = await UserService.sendCodeToVerifyEmail(options);
    return res.RH.success(data);
  } catch (error) {
    return res.RH.error(error);
  }
}


export async function verifyEmailWithCode(req, res) {
  try {
    let options = req.body;
    options.user = req.user;
    let data = await UserService.verifyEmailWithCode(options);
    return res.RH.success(data);
  } catch (error) {
    return res.RH.error(error);
  }
}

export async function uploadAvatarForUser(req, res) {
  try {
    let options = req.file;
    options.user = req.user;
    let data = await UserService.uploadAvatarForUser(options);
    return res.RH.success(data);
  } catch (error) {
    return res.RH.error(error);
  }
}

export async function changePassWord(req, res) {
  try {
    let options = req.body;
    options.user = req.user;
    let data = await UserService.changePassWord(options);
    return res.RH.success(data);
  } catch (error) {
    return res.RH.error(error);
  }
}