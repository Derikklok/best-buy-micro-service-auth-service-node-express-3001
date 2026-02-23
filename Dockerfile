# Multi-stage build for Auth Service

# Stage 1: Build dependencies
FROM node:25-alpine3.22 AS base

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Stage 2: Runtime
FROM node:25-alpine3.22

WORKDIR /app

# Copy node_modules from base stage
COPY --from=base /app/node_modules ./node_modules

# Copy application code
COPY package*.json ./
COPY src/ ./src/

# Expose port
EXPOSE 3001

# Health check - verify the service is healthy
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3001/health', (r) => {if (r.statusCode !== 200) throw new Error(r.statusCode)}).on('error', () => process.exit(1))"

# Start application
CMD ["node", "src/server.js"]
