import path from 'node:path';
import { fileURLToPath } from 'url';
import pino from 'pino';
import dotenv from 'dotenv';
import process from 'node:process';

dotenv.config();

const transport = pino.transport({
    target: 'pino-loki',
    options: {
        batching: true,
        interval: 5,
        labels: {
            app: process.env.APP_NAME,
            env: process.env.NODE_ENV || 'development'
        },
        host: process.env.LOKI_HOST,
        basicAuth: {
            username: process.env.LOKI_USERNAME,
            password: process.env.LOKI_PASSWORD
        }
    }
});

/**
 * Factory function to create a pino logger with a specified name.
 *
 * @param loggerName - The name of the logger.
 * @returns A pino.Logger instance.
 */

function logFactory(loggerName)
{
    const useLoki = !!process.env.LOKI_HOST;

    return pino(
        {
            name: loggerName,
            formatters: {
                level: (level) => ({ level })
            },
            base: undefined,
            timestamp: pino.stdTimeFunctions.isoTime
        },
        useLoki ? transport : undefined
    );
}

/**
 * Creates a logger instance with a specified name.
 *
 * @param name - The name of the logger or the NodeModule.
 * @returns A pino.Logger instance.
 */

export function createLogger(name)
{
    let loggerName;

    if (name != null)
    {
        if (typeof name === 'string')
        {
            loggerName = name;
        }
        else if (typeof name === 'object' && name.url)
        {
            const filename = fileURLToPath(name.url);
            loggerName = filename.split(path.sep).slice(-2).join(path.sep);
        }
        else
        {
            loggerName = 'default';
        }
    }
    else
    {
        loggerName = 'default';
    }

    return logFactory(loggerName);
}

const logger = logFactory('unhandled');

/**
 * Handles uncaught exceptions by logging the error.
 *
 * @param err - The error object.
 */

process.on('uncaughtException', (err) =>
{
    if (err && err.stack)
    {
        logger.error(err, err.message);
    }
    else
    {
        logger.error('uncaughtException, no stack trace available');
    }
});

/**
 * Handles unhandled promise rejections by logging the error.
 *
 * @param err - The error object.
 */

process.on('unhandledRejection', (err) =>
{
    if (err && err.stack)
    {
        logger.error(err, err.message);
    }
    else
    {
        logger.error('unhandledRejection, no stack trace available');
    }
});
