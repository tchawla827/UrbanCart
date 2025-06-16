# Use official Node.js image for building the React app
FROM node:18-alpine as build

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json* ./
RUN npm install

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Use a lightweight nginx image to serve the built files
FROM nginx:alpine

# Copy build output to nginx html directory
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80 and run nginx
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
