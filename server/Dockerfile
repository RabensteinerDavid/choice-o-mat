FROM node:slim

WORKDIR /usr/src/app

# Copy package.json and package-lock.json (or npm-shrinkwrap.json)
COPY ./package.json ./
COPY ./package-lock.json ./  
# Make sure you have a package-lock.json file

# Install dependencies using npm
RUN npm install

# Copy the rest of your application code
COPY . .

# Expose the port your app runs on
EXPOSE 3001

# Command to run your app
CMD ["npm", "start","dev" ]
