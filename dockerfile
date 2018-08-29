# Use Node runtime
FROM node:9

# create app directory
WORKDIR /boilerplate-api


# Download node
# RUN apt-get update -y
# RUN apt-get install curl -y
# RUN curl -sL https://deb.nodesource.com/setup_9.x | bash
# RUN apt-get install nodejs -y

# add all files from the *local* current directory into new work directory *inside container*
ADD . /boilerplate-api

# Run command "npm install"
RUN node -v
RUN npm -v
RUN ls -l
RUN npm install

# open port 8080
EXPOSE 8080

# Run command "npm start"
CMD ["npm", "run", "dev"]
