# Use the official Node.js runtime as the base image - Force cache invalidation
FROM node:18-alpine3.19
# Add unique comment to force cache invalidation
# CACHE_BUSTER: 2025-01-10-FORCE-REBUILD-COMPLETE

# Build arguments
ARG BUILD_TIMESTAMP
ARG NEXT_PUBLIC_API_BASE=https://crypto-cashier-production.up.railway.app

# Set the working directory
WORKDIR /app

# Force cache invalidation - this step will ALWAYS run
RUN echo "FORCE_REBUILD_$(date +%s)" > /tmp/force-rebuild-$(date +%s).txt

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy the rest of the application
COPY . .

# Set environment variables for build
ENV NEXT_PUBLIC_API_BASE=${NEXT_PUBLIC_API_BASE}

# Force cache invalidation - create unique file to break cache
RUN echo "Build timestamp: ${BUILD_TIMESTAMP}" > /tmp/build-timestamp.txt && \
    echo "Force rebuild: $(date)" > /tmp/force-rebuild.txt && \
    echo "CACHE_BUSTER: $(date +%s)" > /tmp/cache-buster.txt && \
    cat /tmp/cache-buster.txt && \
    ls -la /tmp/

# Build the application - force clean build
RUN rm -rf .next && npm run build

# Expose the port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]