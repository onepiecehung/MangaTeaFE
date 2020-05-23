export class ErrorMessage {
    type: string;
    key: string;
    message: string;
    constructor(key, message, type?) {
        this.key = key;
        this.message = message;
        if (type) {
            this.type = type;
        }
    }
}