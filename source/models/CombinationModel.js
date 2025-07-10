import ValidationError from '../errors/ValidationError.js';

class CombinationModel
{

    /**
     * Insert multiple combinations into the `combinations` table.
     * @param {import('mysql2/promise').PoolConnection} connection MySQL transaction connection
     * @param {string[][]} combinations Array of item arrays, e.g. [["A1", "B1"], ["A2", "B2"]]
     * @returns {Promise<number>} Insert ID of the first inserted combination
     */

    async insertMany(connection, combinations)
    {
        if (!Array.isArray(combinations) || combinations.length === 0)
        {
            throw new ValidationError('Invalid input: combinations must be a non-empty array');
        }

        const values = combinations.map(combination => [JSON.stringify(combination)]);

        const sql = `INSERT INTO combinations (combination) VALUES ?`;

        const [result] = await connection.query(sql, [values]);

        return result.insertId;
    }
}

export default new CombinationModel();
