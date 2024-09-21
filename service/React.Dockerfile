# Use official Node.js image as the base image
FROM node:14-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json if available
COPY react-ui/package*.json ./

# Install dependencies
RUN npm install --silent

# Copy the rest of the application
COPY react-ui ./

# Expose port 3000
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
