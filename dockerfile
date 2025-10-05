
# Stage 1: Build the Angular application
FROM node:21-alpine3.19 AS builder

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci --only=production

COPY . .

RUN npm run build

# Development stage (for docker-compose development)
FROM node:21-alpine3.19 AS development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4200

# Start development server
CMD ["npm", "start", "--", "--host", "0.0.0.0", "--port", "4200"]
