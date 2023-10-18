import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import cookieParser from "cookie-parser";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import config from "./config";

import healthRouter from "./src/modules/health/router";
import configRouter from "./src/modules/config/router";
import testRouter from "./src/modules/test/router";
import { keycloak, protectedRoute } from "@bcgov/kc-express";

const { OPENAPI_OPTIONS, CORS_OPTIONS, RATE_LIMIT_OPTIONS } = config;

// Define Express App
const app = express();
keycloak(app);

// Swagger OpenAPI configuration.
app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerJSDoc(OPENAPI_OPTIONS))
);

/**
 * Middleware for parsing request bodies.
 * @module body-parser
 * @property {Function} urlencodedParser - Middleware for parsing URL-encoded data from the request body.
 * @property {Function} jsonParser - Middleware for parsing JSON data from the request body.
 */
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(cors(CORS_OPTIONS));
app.use(rateLimit(RATE_LIMIT_OPTIONS));
app.use(cookieParser());

// Disabled because it exposes information about the used framework to potential attackers.
app.disable("x-powered-by");

// Routing
app.use("/health", healthRouter);
app.use("/config", configRouter);
app.use("/test", protectedRoute(), testRouter);

export default app;
