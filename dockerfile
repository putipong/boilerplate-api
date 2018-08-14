FROM node:9

# Create app directory
WORKDIR /home/ubuntu/boilerplate-api

# Install app dependencies
# A wildcard is used  to ensure both package.json And package-lock.json are copied
# Where available (npm@5+)
# COPY package*.json ./

 RUN npm install
 # Run command "npm install"

 #bundle app resource
COPY . .

# Open port 8080
EXPOSE 8080

# Run command "npm start"
CMD [ "npm", "start"]
