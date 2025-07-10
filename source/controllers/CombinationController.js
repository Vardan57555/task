import CombinationService from '../services/CombinationService.js';

class CombinationController
{

    /**
     * Handle POST request to generate and store valid combinations.
     *
     * @param req - The request object.
     * @param res - The response object.
     * @param next - The next middleware function.
     */

    async createCombinationHandler(req, res, next)
    {
        const { items, length } = req.body;

        try
        {

            const result = await CombinationService.create(items, length);

            return res.json(result);
        }
        catch (error)
        {
            next(error);
        }
    }
}

export default new CombinationController();
