FROM node:22.3-bullseye-slim

WORKDIR /app

COPY package.json .

COPY . .

# Install dependencies
RUN npm install


# Expose the application port
EXPOSE 4000

CMD [ "npm","run","start" ]