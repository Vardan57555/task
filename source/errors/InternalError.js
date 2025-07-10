import BaseError from './BaseError.js';

/**
 * Class representing an internal server error.
 * Extends the built-in Error class.
 * Stores the original error for debugging purposes.
 */

export default class InternalError extends BaseError {
    constructor(message) {
        super(message, 500);
    }
}
