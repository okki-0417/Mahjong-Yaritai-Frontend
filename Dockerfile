FROM node:22.6.0

WORKDIR /frontend

ENV NODE_ENV=development

COPY package.json package-lock.json ./
RUN npm install

COPY . .

CMD ["npm", "run", "start"]
