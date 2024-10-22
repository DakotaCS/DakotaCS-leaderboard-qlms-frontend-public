# Use Node.js image as base
FROM node:14 as build

# Set working directory
WORKDIR /interactive-leaderboard

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire application
COPY . .

# Build the React app
RUN npm run build

# Use Nginx as the production server
FROM nginx:alpine

# Copy build files from the build stage to serve via Nginx
COPY --from=build /interactive-leaderboard/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
