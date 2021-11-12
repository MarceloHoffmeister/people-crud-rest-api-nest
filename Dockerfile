FROM node:12.22.7

# Install system dependencies
RUN apt-get update && apt-get install -y \
    nano \
    vim

WORKDIR /var/www/html

COPY package.json .

RUN npm install --quiet

COPY . .

# Create system user
RUN useradd -G www-data,root -ms /bin/bash -d /home/luffy luffy
RUN mkdir -p /home/luffy/.composer && \
    chown -R luffy:luffy /var/www/html

USER luffy
