/* imports */
import 'dotenv/config';

export type Environment = 'development' | 'production' | 'testing';

export const CONSTANTS = {
    /* application */
    ENVIRONMENT: (process.env['ENVIRONMENT'] ?? 'development') as Environment,
    PORT: process.env['PORT'] ?? '8080',
    MICROSERVICE: process.env['MICROSERVICE'] ?? 'Microservice',
    /* PostgreSQL */
    POSTGRESQL_HOST: process.env['POSTGRESQL_HOST'] ?? '',
    POSTGRESQL_PORT: process.env['POSTGRESQL_PORT'] ?? '',
    POSTGRESQL_DBNAME: process.env['POSTGRESQL_DBNAME'] ?? '',
    POSTGRESQL_USERNAME: process.env['POSTGRESQL_USERNAME'] ?? '',
    POSTGRESQL_PASSWORD: process.env['POSTGRESQL_PASSWORD'] ?? '',
};
