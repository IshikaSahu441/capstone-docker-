# Use an official Node.js image
FROM node:20

# Set the working directory inside the container
WORKDIR /home/app

# Copy only the package.json and package-lock.json to install dependencies first
COPY app/package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app source code
COPY app/ .

# Expose the port your app runs on
EXPOSE 3000

# Start the app
CMD ["node", "server.js"]
