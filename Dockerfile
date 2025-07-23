# Use official Node.js LTS image
FROM node:24-alpine

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Build the app
RUN npm run build

# Remove dev dependencies
RUN npm prune --production

# Copy application source
COPY . .

# Expose port
EXPOSE 3001

# Start the app using compiled JS
CMD ["node", "dist/index.js"]