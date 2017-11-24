
export default class CommonError extends Error {
    constructor(code, message) {
        super(message);
        this.message = message;
        this.code = code;
    }

    toString() {

        return 'code is not zero but ' + this.code + ':' + this.message
    }
}