FROM node:20.6-bullseye-slim as base

WORKDIR /app

# Copy files - ignores files from .dockerignore file.
COPY . .

# ================================= #
# 🐳🐳       DEV BUILD       🐳🐳 #
# ================================= #
FROM base as dev
ENV NODE_ENV=development

# Install packages.
RUN npm i

# Nodemon Entrypoint.
CMD ["npm", "run", "dev"]

# ================================= #
# 🐳🐳   [1/2] PROD BUILD    🐳🐳 #
# ================================= #
FROM base as prod-build

# Omits dev dependencies on install.
ENV NODE_ENV=production

# Install packages and build the project.
RUN npm i && \
    npm run build

# ================================= #
# 🐳🐳       [2/2] PROD      🐳🐳 #
# ================================= #
FROM node:20.6-bullseye-slim as prod
ENV NODE_ENV=production

WORKDIR /app

# Copy build files.
COPY --from=prod-build /app/build/ .
COPY --from=prod-build /app/node_modules ./node_modules

# Node Entrypoint.
CMD ["node","index.js"]
