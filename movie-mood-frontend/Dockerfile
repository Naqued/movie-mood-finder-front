FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3048

# Use preview command for production
CMD ["npm", "run", "preview"] 