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
# 🐳🐳       PROD Build      🐳🐳 #
# ================================= #
FROM base as prod-build

WORKDIR /app

# Install packages and build the project.
RUN npm i && \
    npm run build

# ================================= #
# 🐳🐳          PROD         🐳🐳 #
# ================================= #
FROM prod-build as prod

WORKDIR /app

COPY --from=prod-build /app/build/ .

ENV NODE_ENV=production

# Node Entrypoint.
CMD ["node","index.js"]
