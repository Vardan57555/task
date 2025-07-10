import mysql from 'mysql2/promise';
import fs from 'fs/promises';
import path from 'path';
import dotenv from 'dotenv';
import { createLogger } from "../utils/logger/Log.js";
dotenv.config();

const logger = createLogger(import.meta);

async function initDatabase()
{
    const DB_NAME = process.env.DB_NAME  || 'combinations';

    const connection = await mysql.createConnection({
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        multipleStatements: true
    });

    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\`;`);
    await connection.query(`USE \`${DB_NAME}\`;`);

    const sqlDir = path.resolve('./migrations');

    const files = ['items.sql', 'combinations.sql', 'responses.sql'];

    for (const file of files)
    {
        const content = await fs.readFile(path.join(sqlDir, file), 'utf-8');
        await connection.query(content);
        logger.info(`✅ Executed ${file}`);
    }

    logger.info(`✅ Database '${DB_NAME}' initialized successfully.`);
    await connection.end();
}

initDatabase().catch((err) =>
{
    logger.error('❌ Error initializing DB:', err);
    process.exit(1);
});
