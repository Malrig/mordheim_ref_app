# Use Node.js LTS version
FROM node:20-slim

# Create app directory
WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy compiled JavaScript files
COPY dist/ ./dist/

# Expose the ports the app runs on
EXPOSE 8043 8044

# Start the application
CMD ["node", "dist/index.js"] 