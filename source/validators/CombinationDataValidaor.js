import Joi from 'joi';
import { setupValidator } from '../utils/validator/SetupValidator.js';

/**
 * Validator class for handling combination request validation using Joi schemas.
 */
class CombinationDataValidator {

    /**
     * Joi schema for validating the request body of creating a combination.
     */
    static createRequestBodySchema = Joi.object().keys({
        items: Joi.array().items(Joi.number()).min(1).required(),
        length: Joi.number().integer().min(1).required()
    });

    /**
     * Validate a request body against the combination schema.
     * @param {Object} data - The request body to validate
     * @returns {Joi.ValidationResult}
     */
    static validateCreateRequestBody(data)
    {
        return setupValidator(data, CombinationDataValidator.createRequestBodySchema);
    }
}

export default CombinationDataValidator;
