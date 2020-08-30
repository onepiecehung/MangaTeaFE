export const ERROR_KEY = {
  USER_NAME: {
    NOT_EMPTY: 'username_is_not_allowed_to_be_empty',
  },
  PASSWORD: {
    NOT_EMPTY: 'password_is_not_allowed_to_be_empty',
    LENGTH: 'password_length_must_be_at_least_6_characters_long',
  },
  EMAIL: {
    NOT_EMPTY: 'email_not_empty',
    INVALID: 'invalid_email',
    EXISTS: 'email_has_exists'
  },
  PASSWORD_CONFIRM: {
    NOT_EMPTY: 'password_confirm_is_not_allowed_to_be_empty',
    CONFIRM_NOT_MATCH: 'password_confirm_not_match'
  }
}
export const ERROR_FIELD = {
  USER_NAME: 'username',
  PASSWORD: 'password',
  EMAIL: 'email',
  PASSWORD_CONFIRM: 'passwordConfirm'
}

export const FORM_FIELD = {
  USER_NAME: 'username',
  PASSWORD: 'password',
  EMAIL: 'email',
  PASSWORD_CONFIRM: 'passwordConfirm'
}

export const ACTION = {
  LOGIN: 'login',
  SIGN_UP: 'sign_up'
}
export const MESSAGE = {
  TITLE_LOGIN: 'log in',
  BTN_LOGIN: 'Log In',
  TITLE_SIGN_UP: 'create new account',
  BTN_SIGN_UP: 'Create Account',
  RESET_PASSWORD: 'Reset Password',  
}
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  SERVER_ERROR: 500
}