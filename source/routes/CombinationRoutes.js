import express from 'express';
import CombinationController from '../controllers/CombinationController.js';
import CombinationDataValidator from "../validators/CombinationDataValidaor.js"
import { validate } from "../common/middleware/ValidateMiddleware.js";

/**
 * CombinationRoute sets up the Express router for handling combination-related routes.
 */

class CombinationRoute
{

    constructor()
    {
        this.router = express.Router();
        this.registerRoutes();
    }

    /**
     * Registers the POST / route for generating combinations.
     */

    registerRoutes()
    {
        this.router.post(
            '/',
            validate(CombinationDataValidator.validateCreateRequestBody, 'body'),
            CombinationController.createCombinationHandler
        );
    }
}

const combinationRoutes = new CombinationRoute();

export default combinationRoutes.router;
