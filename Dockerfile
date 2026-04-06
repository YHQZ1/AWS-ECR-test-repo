# ---------- Stage 1: Build ----------
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies (better caching)
COPY package*.json ./
RUN npm ci

# Copy source
COPY . .

# Build Vite app
RUN npm run build


# ---------- Stage 2: Serve ----------
FROM nginx:1.25-alpine

# Remove default static files
RUN rm -rf /usr/share/nginx/html/*

# Copy build output
COPY --from=builder /app/dist /usr/share/nginx/html

# Add custom nginx config (SPA support)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]