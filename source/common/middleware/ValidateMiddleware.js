import ValidationError from '../../errors/ValidationError.js';

/**
 * Creates validation middleware using a given validator function.
 *
 * @param {Function} validator - Function that returns Joi ValidationResult.
 * @param {'body' | 'query' | 'params' | 'headers'} target - The req target to validate.
 * @returns {Function} Express middleware.
 */

export function validate(validator, target = 'body')
{
    return (req, res, next) =>
    {
        const result = validator(req[target]);

        if (result.error)
        {
            return next(new ValidationError(result.error.message));
        }

        req[target] = result.value;
        next();
    };
}
