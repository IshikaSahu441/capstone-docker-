FROM node:20

# Set working directory
WORKDIR /home/app

# Copy dependencies and install
COPY app/package*.json ./
RUN npm install

# Copy the entire app folder contents
COPY app/ .

# Expose the port
EXPOSE 3000

# Start the app
CMD ["node", "server.js"]
