# Use Node directly
FROM node:20-alpine

WORKDIR /app

# Install deps
COPY ecr-tester/package*.json ./
RUN npm install

# Copy app
COPY ecr-tester/ .

# Expose Vite port
EXPOSE 5173

# Run Vite dev server
CMD ["npm", "run", "dev", "--", "--host"]