import BaseError from './BaseError.js';

/**
 * Class representing a validation error.
 * Extends the built-in Error class.
 * Used to indicate input or data validation failures.
 */

export default class ValidationError extends BaseError {
    constructor(message) {
        super(message, 400);
    }
}

