# -------- Stage 1: Build --------
FROM node:20-alpine AS builder

WORKDIR /app

# Install deps first (better caching)
COPY ecr-tester/package*.json ./
RUN npm ci

# Copy rest of the app
COPY ecr-tester/ .

# Build the Vite app
RUN npm run build


# -------- Stage 2: Serve --------
FROM nginx:alpine

# Remove default nginx static files
RUN rm -rf /usr/share/nginx/html/*

# Copy built files from builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]