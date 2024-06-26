FROM gcr.io/distroless/nodejs20-debian12@sha256:a69b487c1d156e3aeaab0ffb587f46248c8e891e289081a3c28f7104a69c4515

ENV NODE_ENV production

COPY /next.config.js ./
COPY /.next ./.next
COPY /node_modules ./node_modules
COPY /package.json ./package.json

ENV PORT=8080
CMD ["./node_modules/next/dist/bin/next", "start"]

EXPOSE 8080
