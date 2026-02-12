FROM node:22-alpine
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci --production
COPY . .
ARG VERSION=dev
ENV VERSION=$VERSION
EXPOSE 3000
CMD ["sh", "-c", "npm run migrate && npm start"]
