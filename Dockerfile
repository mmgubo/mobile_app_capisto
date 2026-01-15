FROM node:25

WORKDIR /mobile-app-capisto
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD npm run dev