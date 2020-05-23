import { Injectable, OnInit } from '@angular/core';
import messages from '../bases/messages.json';
import { ErrorMessage } from '../types/error-message';

@Injectable({
  providedIn: 'root'
})
export class ErrorMessageService {
  errorMessage: ErrorMessage;
  public getMessage(key) {
    for (let msg of Object.values(messages)) {
      key = key.replace('"',"").replace(" ", "_").toLowerCase();
      key = key.replace('"',"").replace(" ", "_").toLowerCase();
      if (msg['key'] == key) {        
        this.errorMessage = new ErrorMessage(msg['key'], msg['message'], msg['type']);
      }
    }
  }
  public clearErrorMessage() {
    this.errorMessage = null;
  }
}
