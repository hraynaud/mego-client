# Build stage
FROM node:18 as build

# Install Quasar CLI
RUN yarn global add @quasar/cli

# Set working directory
WORKDIR /app

# Copy package files first for better caching
COPY package.json yarn.lock* ./

# Install dependencies
RUN yarn install

# Copy the rest of the application
COPY . .


# Build with environment variables
ARG SERVER_URL
ENV SERVER_URL=${SERVER_URL}
RUN quasar build

# Production stage
FROM pierrezemb/gostatic

# Copy built files from the build stage
COPY --from=build /app/dist/spa /srv/http/

# Set command to serve with fallback for SPA routing
CMD ["-port", "9000","-fallback", "index.html"]
