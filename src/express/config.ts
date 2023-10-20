import { KCOptions, KeycloakUser } from "@bcgov/kc-express";
import { activateUser } from "./src/utils/activateUser";

// Environment variables set in compose file.
const {
  NODE_ENV,
  ENVIRONMENT,
  DEBUG,
  FRONTEND_PORT,
  FRONTEND_URL,
  BACKEND_URL,
  PORT,
  PGHOST,
  PGUSER,
  PGPASSWORD,
  PGDATABASE,
} = process.env;

// Use production urls unless ENVIRONMENT === "local".
let frontendUrl = FRONTEND_URL;
let backendUrl = BACKEND_URL;

if (ENVIRONMENT && ENVIRONMENT === "local") {
  frontendUrl = `http://localhost:${FRONTEND_PORT}`;
  backendUrl = `http://localhost:${PORT}`;
}

/**
 * Middleware for enabling Cross-Origin Resource Sharing (CORS) on the server.
 * @module cors
 * @property {string|string[]} origin - The allowed origins for CORS requests.
 * @property {boolean} credentials - Whether to allow credentials to be included in CORS requests.
 */
const CORS_OPTIONS = {
  origin: frontendUrl,
  credentials: true,
};

/**
 * Middleware for rate-limiting requests on the server.
 * @module express-rate-limit
 * @property {number} windowMs - The length of the rate-limiting window in milliseconds.
 * @property {number} max - The maximum number of requests allowed per window per IP address.
 * @property {boolean} headers - Whether to include rate limit info in the `RateLimit-*` headers.
 * @property {boolean} legacy - Whether to include rate limit info in the `X-RateLimit-*` headers (deprecated).
 */
const RATE_LIMIT_OPTIONS = {
  windowMs: 2 * 1000, // 2 seconds
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
};

// Swagger OpenAPI configuration.
const OPENAPI_OPTIONS = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Keycloak Demo",
      version: "1.0.0",
      description: "API documentation",
    },
    servers: [{ url: backendUrl }],
  },
  apis: ["./src/**/*swagger.yaml"],
};

// Keycloak auth integration configuration.
const KEYCLOAK_OPTIONS = {
  afterUserLogin: (user: KeycloakUser) => {
    if (DEBUG)
      console.log("DEBUG: afterUserLogin in config KEYCLOAK_OPTIONS called.");
    activateUser(user);
  },
  afterUserLogout: (user: KeycloakUser) => {
    if (DEBUG)
      console.log("DEBUG: afterUserLogout in config KEYCLOAK_OPTIONS called.");
    console.log(`${user?.display_name ?? "Unknown"} has logged out.`);
  },
} as KCOptions;

// Exported configuration values.
export default {
  PORT: PORT ?? 3600,
  NODE_VERSION: process.version,
  NODE_ENV,
  DEBUG: DEBUG === "true",
  ENVIRONMENT,
  FRONTEND_URL: frontendUrl,
  BACKEND_URL: backendUrl,
  CORS_OPTIONS,
  RATE_LIMIT_OPTIONS,
  OPENAPI_OPTIONS,
  KEYCLOAK_OPTIONS,
  PGHOST,
  PGUSER,
  PGPASSWORD,
  PGDATABASE,
};
