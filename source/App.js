import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import combinationRoutes from './routes/CombinationRoutes.js';
import { createLogger } from "./utils/logger/Log.js";
dotenv.config();

const logger = createLogger(import.meta);

/**
 * Main application class for setting up and running the Express server.
 * Handles middleware configuration, route registration, and error handling.
 */

class App
{

    constructor()
    {
        this.app = express();
        this.config();
        this.routes();
        this.errorHandling();
    }

    /**
     * Applies middleware configurations such as body parsing.
     * Uses limits based on environment variables (REQUEST_BODY_LIMIT).
     */

    config()
    {
        const requestBodyLimit = process.env.REQUEST_BODY_LIMIT || '100kb';

        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended: true, limit: requestBodyLimit})
        );
    }

    /**
     * Registers application routes.
     * - /generate: Handles combination generation logic
     * - /: Root route with a basic health check message
     */

    routes()
    {
        this.app.use('/generate', combinationRoutes);
        this.app.get('/', (req, res) => {
            res.send('Generate Combinations API is running');
        });
    }

    /**
     * Global error handling middleware.
     * Logs error stack and sends a generic error response.
     */

    errorHandling()
    {
        this.app.use((err, req, res, next) => {
            logger.error(err.stack);

            const status = err.status || 500;
            const response = {
                error: err.message || 'Something went wrong!'
            };

            response.stack = err.stack;

            res.status(status).json(response);
        });
    }


    /**
     * Starts the Express server on the configured port.
     */

    listen()
    {
        const PORT = process.env.APP_PORT || 3000;
        this.app.listen(PORT, () =>
        {
            const lines = [
                `Listening on: http://localhost:${PORT}`,
            ];
            logger.info(lines.join('\n'));
        });
    }
}

export default new App();
