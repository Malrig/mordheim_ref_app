# Use Node.js LTS version
FROM node:20-slim

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY apps/server/package*.json ./apps/server/

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Set the working directory to the server app
WORKDIR /app/apps/server

# Expose the ports
EXPOSE 8043 8044

# Start the server
CMD ["node", "dist/index.js"] 