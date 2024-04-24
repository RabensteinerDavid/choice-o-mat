FROM node:slim

WORKDIR /usr/src/app

# Copy package.json and yarn.lock
COPY ./package.json ./
COPY ./package-lock.json ./

# Install dependencies using npm
RUN npm install

# Copy the rest of your application code
COPY . .

# Set environment variable for the base URL
ENV REACT_APP_BASE_URL=http://localhost:3001/api

# Expose the port your app runs on
EXPOSE 3000

# Command to run your app
CMD [ "npm", "start" ]
