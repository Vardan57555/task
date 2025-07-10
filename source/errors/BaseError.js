class BaseError extends Error {
    constructor(message, status = 500, originalError = null) {
        super(message);
        this.status = status;
        this.originalError = originalError;

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}
export default BaseError;
