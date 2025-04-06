# Use Node.js LTS version
FROM node:20-slim

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install production dependencies only
RUN npm install --omit=dev

# Copy only the built files
COPY dist ./dist

# Expose the ports
EXPOSE 8043 8044

# Start the server
CMD ["node", "dist/index.js"] 