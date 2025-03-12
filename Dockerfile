# Use official Node.js image
FROM node:18

# Set working directory inside container
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy all frontend files
COPY . ./

# Expose the port used by React
EXPOSE 3000

# Start React development server
CMD ["npm", "start"]
