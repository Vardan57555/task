import BaseError from './BaseError.js';

/**
 * Class representing a database-related error.
 * Extends the built-in Error class.
 * Captures the original error for detailed debugging.
 */

export default class DatabaseError extends BaseError {
    constructor(message) {
        super(message, 500);
    }
}
