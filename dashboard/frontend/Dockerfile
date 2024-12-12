# Use Node.js official image to build the frontend
FROM node:19-bullseye

# Set working directory for frontend
WORKDIR /frontend

# Copy the frontend's package.json and package-lock.json
COPY frontend/package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the frontend files
COPY frontend/ ./

# Build the frontend (e.g., for React, this could be 'npm run build')
RUN npm run build

# Serve the frontend using a simple static file server like `serve`
RUN npm install -g serve

# Expose port 8081 for frontend
EXPOSE 8081

# Start the frontend application
CMD ["serve", "-s", "build", "-l", "8081"]
