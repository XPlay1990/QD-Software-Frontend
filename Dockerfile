FROM node:alpine AS builder

WORKDIR /opt/web
COPY package.json package-lock.json ./
RUN npm install

ENV PATH="./node_modules/.bin:$PATH"

COPY . ./
# Arguments
ARG REACT_APP_API_BASE_URL
ENV REACT_APP_API_BASE_URL=${"api.qd-software.de"}

RUN npm run build

FROM bitnami/nginx:latest
COPY --from=builder /opt/web/build /app