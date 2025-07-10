import db from '../config/Db.js';
import ItemModel from '../models/ItemModel.js';
import CombinationModel from '../models/CombinationModel.js';
import CombinationGenerator from '../utils/generator/CombinationGeneratorUtils.js';
import InternalError from '../errors/InternalError.js';
import DatabaseError from '../errors/DatabaseError.js';
import ResponseModel from "../models/ResponseModel.js";

class CombinationService
{

    /**
     * Generate valid combinations from input, store them in DB, and return the response ID and data.
     * @param {number[]} inputItems - Array of item type counts, e.g. [1,2,1]
     * @param {number} combinationLength - Desired combination length
     * @returns {Promise<{ id: number, combination: string[][] }>}
     */

    async create(inputItems, combinationLength)
    {

        let items, validCombinations;

        try
        {
            items = this.mapInputToItems(inputItems);
            validCombinations = CombinationGenerator.generateUniquePrefixCombinations(items, combinationLength);
        }
        catch (err)
        {
            throw new InternalError('Failed to generate combinations', err);
        }

        const connection = await db.getConnection();

        try
        {
            await connection.beginTransaction();

            await ItemModel.insertMany(connection, items);

            await CombinationModel.insertMany(connection, validCombinations);

            const responseId = await ResponseModel.insertResponse(connection, validCombinations);

            await connection.commit();

            return {
                id: responseId,
                combinations: validCombinations,
            };
        }
        catch (error)
        {
            await connection.rollback();

            throw new DatabaseError('Database transaction failed', error);
        }
        finally
        {
            connection.release();
        }
    }

    /**
     * Convert input like [1, 2, 1] into items like ['A1', 'B1', 'B2', 'C1']
     * @param {number[]} inputItems
     * @returns {string[]}
     */

    mapInputToItems(inputItems)
    {
        const items = [];
        let charCode = 65;

        for (const count of inputItems)
        {
            for (let i = 1; i <= count; i++)
            {
                items.push(String.fromCharCode(charCode) + i);
            }
            charCode++;
        }

        return items;
    }
}

export default new CombinationService();
