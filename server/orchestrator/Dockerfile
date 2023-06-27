FROM node:18.16.0

ENV NODE_ENV=production
ENV PORT=4000
WORKDIR /app
COPY ["package.json", "package-lock.json", "./"]

RUN npm install --production

COPY . .

CMD ["npm", "start"]