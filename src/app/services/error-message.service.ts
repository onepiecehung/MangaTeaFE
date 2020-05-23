import { Injectable, OnInit } from '@angular/core';
import messages from '../bases/messages.json';
import { ErrorMessage } from '../types/error-message';
import { ERROR_KEY, ERROR_FIELD } from 'src/constants/constant-common';

@Injectable({
  providedIn: 'root'
})
export class ErrorMessageService {

  errorMessage: ErrorMessage;
  usernameError: ErrorMessage;
  emailError: ErrorMessage;
  passwordError: ErrorMessage;
  passwordConfirmError: ErrorMessage;
  getMessageFromKey(key) {
    for (let msg of Object.values(messages)) {
      key = key.replace('"', "").replace(" ", "_").toLowerCase();
      key = key.replace('"', "").replace(" ", "_").toLowerCase();
      if (msg['key'] == key) {
        this.errorMessage = new ErrorMessage(msg['key'], msg['message'], msg['field']);
        this.setErrorField(this.errorMessage);
      }
    }
  }
  getMessageFromFieldAndKey(field: string, key: string): ErrorMessage {
    for (let msg of Object.values(messages)) {
      if (msg['key'] == key && msg['field'] == field) {
        return new ErrorMessage(msg['key'], msg['message'], msg['field']);
      }
    }
  }
  clearErrorMessage() {
    this.errorMessage = null;
    this.usernameError = null;
  }
  handleErrorUsername(valueInput: string) {
    if (valueInput == '') {
      this.usernameError = this.getMessageFromFieldAndKey(ERROR_FIELD.USER_NAME, ERROR_KEY.USER_NAME.NOT_EMPTY);
    } else {
      this.usernameError = null;
    }
  }
  handleErrorEmail(valueInput: string) {
    if (valueInput == '') {
      this.emailError = this.getMessageFromFieldAndKey(ERROR_FIELD.EMAIL, ERROR_KEY.EMAIL.NOT_EMPTY);
    } else if (!this.validMail(valueInput)) {
      this.emailError = this.getMessageFromFieldAndKey(ERROR_FIELD.EMAIL, ERROR_KEY.EMAIL.INVALID);
    } else {
      this.emailError = null;
    }
  }
  handleErrorPassword(valueInput: string, passwordConfirm: string) {
    if (valueInput == '') {
      this.passwordError = this.getMessageFromFieldAndKey(ERROR_FIELD.PASSWORD, ERROR_KEY.PASSWORD.NOT_EMPTY);
    } else if (valueInput.length < 6) {
      this.passwordError = this.getMessageFromFieldAndKey(ERROR_FIELD.PASSWORD, ERROR_KEY.PASSWORD.LENGTH);
    } else if (passwordConfirm != '' && valueInput === passwordConfirm) {
      this.passwordConfirmError = null;
    } else {
      this.passwordError = null;
    }
  }
  handleErrorPasswordConfirm(valueInput: string, password: string) {
    if (valueInput == '') {
      this.passwordConfirmError = this.getMessageFromFieldAndKey(ERROR_FIELD.PASSWORD_CONFIRM, ERROR_KEY.PASSWORD_CONFIRM.NOT_EMPTY);
    } else if (valueInput != password) {
      this.passwordConfirmError = this.getMessageFromFieldAndKey(ERROR_FIELD.PASSWORD_CONFIRM, ERROR_KEY.PASSWORD_CONFIRM.CONFIRM_NOT_MATCH);
    } else {
      this.passwordConfirmError = null;
    }
  }

  validMail(mail: string) {
    return /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+([^<>()\.,;:\s@\"]{2,}|[\d\.]+))$/.test(mail);
  }
  setErrorField(error: ErrorMessage) {
    switch (error.field) {
      case ERROR_FIELD.USER_NAME:
        this.usernameError = error;
        break;
      case ERROR_FIELD.EMAIL:
        this.emailError = error;
        break;
      case ERROR_FIELD.PASSWORD:
        this.passwordError = error;
        break;
      case ERROR_FIELD.PASSWORD_CONFIRM:
        this.passwordConfirmError = error;
        break;
    }
  }
}
