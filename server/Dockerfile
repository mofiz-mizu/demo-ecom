# Use official Node.js LTS image
FROM node:20-alpine

# Create app directory
WORKDIR /app

# Copy package.json files first (better caching)
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of the backend source
COPY . .

# Expose backend port
EXPOSE 5000

# Start server
CMD ["node", "src/index.js"]
