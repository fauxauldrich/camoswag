#!/usr/bin/env node
const argv = require("yargs").argv;
const specFile = argv.s || argv.spec;
const winston = require("winston");
const fs = require("fs");
const path = require("path");
const createMocks = require("../index");

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.simple(),
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    winston.format.printf((log) => `${log.timestamp} ${log.level}: ${log.message}` + (log.splat !== undefined ? `${log.splat}` : " "))
  ),
  transports: [new winston.transports.Console()],
});

if (!specFile) {
  logger.error("Please specify at least one of the input parameters.");
  logger.info("Available options are: -s/--spec");
  process.exit(1);
}
if (specFile) {
  const specFilePath = path.resolve(specFile);
  if (typeof specFile !== "string" || !fs.existsSync(specFilePath)) {
    logger.error(`${specFile} is not a valid file. Please provide a valid OpenAPI Specification file to proceed.`);
    process.exit(1);
  } else {
    createMocks(specFilePath);
  }
}
