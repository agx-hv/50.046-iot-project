# Use Node.js official image for backend
FROM node:19-bullseye

# Set working directory for backend
WORKDIR /backend

# Copy the backend's package.json and package-lock.json
COPY backend/package*.json ./

# Install dependencies
RUN npm install

# Copy the backend files (including server.js or your entry file)
COPY backend/ ./

# Expose port 8080 for backend
EXPOSE 8080

# Start the backend server (adjust to your backend server entry point)
CMD ["node", "server.js"]
