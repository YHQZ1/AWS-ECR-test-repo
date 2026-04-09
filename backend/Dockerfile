# Use Node 22 for consistency across the stack
FROM node:22-alpine

WORKDIR /app

# Install dependencies first (better caching)
COPY package*.json ./
RUN npm install --production

# Copy the server code
COPY . .

# Match the port in your server.js
EXPOSE 3000

# Start the server
CMD ["node", "server.js"]