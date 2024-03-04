# syntax=docker/dockerfile:1.4

# 1. For build React app
FROM node:lts AS development

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json yarn.lock ./

COPY . .

ENV CI=true
ENV PORT=3000

# Development command
CMD [ "yarn", "start" ]

# Build stage
FROM development AS build

RUN yarn build

# Development environment setup
FROM development as dev-envs
RUN <<EOF
apt-get update
apt-get install -y --no-install-recommends git
EOF

RUN <<EOF
useradd -s /bin/bash -m vscode
groupadd docker
usermod -aG docker vscode
EOF

# Install Docker tools (cli, buildx, compose)
COPY --from=gloursdocker/docker / /

CMD [ "yarn", "start" ]

# 2. For Nginx setup
FROM nginx:alpine

# Copy nginx config
COPY --from=build /app/.nginx/nginx.conf /etc/nginx/conf.d/default.conf

WORKDIR /usr/share/nginx/html

# Remove default nginx static assets
RUN rm -rf ./*

# Copy static assets from builder stage
COPY --from=build /app/build .

# Containers run nginx with global directives and daemon off
ENTRYPOINT ["nginx", "-g", "daemon off;"]
