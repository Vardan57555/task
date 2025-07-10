import ValidationError from "../errors/ValidationError.js";

class ItemModel
{
    /**
     * Insert multiple items into the `items` table.
     * @param {import('mysql2/promise').PoolConnection} connection MySQL transaction connection
     * @param {string[]} items Array of item names like ['A1', 'B1', 'B2', 'C1']
     * @returns {Promise<void>}
     */
    async insertMany(connection, items)
    {
        if (!Array.isArray(items) || items.length === 0)
        {
            throw new ValidationError('No items to insert.');
        }

        const values = items.map(name => [name]);

        const sql = `INSERT IGNORE INTO items (name) VALUES ?`;

        await connection.query(sql, [values]);
    }
}

export default new ItemModel();
