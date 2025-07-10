/**
 * Validates an object against a given Joi schema.
 *
 * @param {Object} obj - The object to validate.
 * @param {Object} schema - The Joi schema to validate against.
 * @param {boolean} stripUnknown - Whether to strip unknown keys from the object.
 * @param {boolean} allowUnknown - Whether to allow unknown keys in the object.
 */
export function setupValidator(obj, schema, stripUnknown = true, allowUnknown = true)
{
    return schema.validate(obj, { stripUnknown, allowUnknown });
}
