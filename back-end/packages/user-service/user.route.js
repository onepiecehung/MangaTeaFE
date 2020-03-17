import * as User_Controller from './user.controller';
import { Router } from 'express';
import {
  USER_LOGIN, USER_REGISTER, USER_EDIT, USER_CHANGE_PASSWORD
} from './user.validation'
import { isUser } from "../../util/JWT/jwt"
import { StringHelpers, ValidationHelpers } from '../../util/Helper';
import path from "path"

const router = new Router();
import multer from 'multer';



const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/avatar')// todo need create folder frist
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + "-" + StringHelpers.generateCode(10) + path.extname(file.originalname))
  }
})
// Check File Type
function checkFileType(file, cb) {
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: Images Only!");
  }
}
var upload = multer({
  storage: storage, fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
})
router.route('/upload-avatar')
  .post(
    isUser.auth(),
    upload.single('avatar'),
    User_Controller.uploadAvatarForUser,
  );

router.route('/register')
  .post(
    // authen
    // multer
    // validation
    // service
    USER_REGISTER,
    User_Controller.SignUp
  );
router.route('/register-with-verify-code')
  .post(
    USER_REGISTER,
    User_Controller.VerifySignUp
  );

router.route("/login")
  .post(
    USER_LOGIN,
    User_Controller.Login
  );

router.route("/logout")
  .post(
    isUser.auth(),
    User_Controller.Logout
  );


router.route("/get-user-by-token")
  .get(
    isUser.auth(),
    User_Controller.getUserByToken
  );

router.route("/:id")
  .get(
    User_Controller.getUserById
  )

router.route("/edit/:id")
  .put(
    isUser.auth(),
    USER_EDIT,
    User_Controller.editUserByToken
  )

router.route("/get-code-to-verify-email")
  .post(
    isUser.auth(),
    User_Controller.sendCodeToVerifyEmail
  )

router.route("/verify-email-with-code")
  .post(
    isUser.auth(),
    User_Controller.verifyEmailWithCode
  )

router.route("/change-password")
  .put(
    isUser.auth(),
    USER_CHANGE_PASSWORD,
    User_Controller.changePassWord
  )

// router.route("/delete/:id")
//   .delete(
//     isUser.auth(),
//     User_Controller.deleteUserByToken
//   )
export default router;