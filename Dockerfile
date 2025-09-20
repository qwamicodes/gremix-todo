# Build stage
FROM node:20-alpine AS builder

# Install system dependencies needed for Prisma and native modules
RUN apk add --no-cache bash openssl

WORKDIR /app

# Copy package files
COPY package.json yarn.lock ./

# Install all dependencies (including devDependencies for building)
RUN yarn install --frozen-lockfile

# Copy source code
COPY . .

# Generate Prisma client and build the application
RUN yarn prisma generate && yarn build

# Production stage
FROM node:20-alpine AS production

# Install system dependencies
RUN apk add --no-cache bash openssl dumb-init

# Create app user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001

WORKDIR /app

# Copy package files
COPY package.json yarn.lock ./

# Copy built application and node_modules from builder stage
COPY --from=builder --chown=nextjs:nodejs /app/build ./build
COPY --from=builder --chown=nextjs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nextjs:nodejs /app/prisma ./prisma

# Copy entrypoint script
COPY entrypoint.sh ./
RUN chmod +x entrypoint.sh && chown nextjs:nodejs entrypoint.sh

# Switch to non-root user
USER nextjs

# Expose port
EXPOSE 3000

# Use dumb-init to handle signals properly
ENTRYPOINT ["dumb-init", "--"]
CMD ["./entrypoint.sh"]