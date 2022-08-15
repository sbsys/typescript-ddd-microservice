/* imports */
import path from 'path';
import { createLogger, format, LoggerOptions, transports } from 'winston';
import { CONSTANTS, Environment } from './Constants';

const { timestamp, combine, colorize, errors, json, printf, simple } = format;

const logFormat = printf(({ level, message, timestamp, stack }) => `${timestamp} ${level} ${stack || message}`);

const logPath = path.join(__dirname, '..', 'logs', `${CONSTANTS.MICROSERVICE}.log`);

const loggerStrategy: Record<Environment, LoggerOptions> = {
    development: {
        format: combine(
            simple(),
            colorize(),
            timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
            errors({
                stack: true,
            }),
            logFormat
        ),
        defaultMeta: { service: CONSTANTS.MICROSERVICE },
        transports: [new transports.Console()],
    },
    production: {
        format: combine(timestamp(), errors({ stack: true }), json()),
        defaultMeta: { service: CONSTANTS.MICROSERVICE },
        transports: [
            new transports.File({
                maxsize: 5120000,
                maxFiles: 5,
                filename: logPath,
            }),
        ],
    },
    testing: {},
};

export const Logger = createLogger(loggerStrategy[CONSTANTS.ENVIRONMENT]);
