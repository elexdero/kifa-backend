import { createConnection } from 'mysql2'; // Cambiamos a Pool
import { DB_HOST, DB_NAME, DB_PORT } from './config.js';

export const tryConnection = (user, password) => {
    return new Promise((resolve, reject) => {
        const connection = createConnection({
            host: DB_HOST,
            port: DB_PORT,
            database: DB_NAME,
            user: user,
            password: password
        });
        connection.connect((err) => {
            if (err) {
                reject(err);
            } else {
                resolve(connection);
            }
        });
    });
};