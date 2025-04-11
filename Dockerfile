FROM node:20

# Create app directory
WORKDIR /home/app

# Copy only package files to install dependencies
COPY app/package*.json ./
RUN npm install

# Copy the rest of the app code
COPY app/ .

EXPOSE 3000

CMD ["node", "server.js"]
