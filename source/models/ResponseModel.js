import ValidationError from "../errors/ValidationError.js";

class ResponseModel
{
    /**
     * Insert the API response into the `responses` table.
     * Stores all combinations as JSON and returns the response ID.
     * @param {import('mysql2/promise').PoolConnection} connection MySQL transaction connection
     * @param {Array<Array<string>>} combinations Array of combinations (each combination is an array of strings)
     * @returns {Promise<number>} Inserted response ID
     */
    async insertResponse(connection, combinations)
    {
        if (!Array.isArray(combinations) || combinations.length === 0) {
            throw new ValidationError('Invalid input: combinations must be a non-empty array of arrays');
        }

        const isValid = combinations.every(
            (combination) => Array.isArray(combination) && combination.every(item => typeof item === 'string')
        );

        if (!isValid)
        {
            throw new ValidationError('Invalid input: all combinations must be arrays of strings');
        }

        const combinationsJson = JSON.stringify(combinations);

        const sql = `INSERT INTO responses (response_data) VALUES (?)`;
        const [result] = await connection.query(sql, [combinationsJson]);

        return result.insertId;
    }
}

export default new ResponseModel();
