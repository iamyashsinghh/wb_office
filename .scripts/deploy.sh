#!/bin/bash
set -e

echo "Deployment started..."

git pull

echo "New changes copied to server !"

echo "Installing Dependencies..."

npm install --yes

echo "Creating Production Build..."

npm run build

echo "PM2 Reload"

pm2 reload 9

echo "Deployment Finished!"