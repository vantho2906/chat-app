FROM node:12.22.9
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
# ENV PROXY_API=34.227.13.91:5001
CMD ["npm","start"]