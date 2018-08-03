#!/bin/bash

cd /home/ubuntu/boilerplate-api

npm i

pm2 start server.js -f
