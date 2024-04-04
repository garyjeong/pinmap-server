# 1 Step
FROM node:21-slim as builder
WORKDIR /app
COPY . .
RUN yarn
RUN yarn build

# 2 Step
FROM node:21-alpine
ENV NODE_ENV development
ENV DB_HOST host.docker.internal
ENV DB_PORT 6000
ENV DB_USERNAME server
ENV DB_PASSWORD pinmap
ENV DB_DATABASE pinmap
ENV DB_LOGGING true
ENV JWT_SECRET secret
ENV HASH_SALT 9

COPY --from=builder /app ./
EXPOSE 3000
CMD ["yarn", "start:prod"]