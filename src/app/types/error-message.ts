export class ErrorMessage {
    field: string;
    key: string;
    message: string;
    constructor(key, message, field?) {
        this.key = key;
        this.message = message;
        if (field) {
            this.field = field;
        }
    }
}