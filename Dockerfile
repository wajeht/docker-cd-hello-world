FROM golang:1.22-alpine AS builder
WORKDIR /app
COPY main.go .
ARG VERSION=dev
RUN go build -ldflags "-X main.version=${VERSION}" -o hello-world .

FROM alpine:3.19
RUN apk add --no-cache ca-certificates
COPY --from=builder /app/hello-world /hello-world
EXPOSE 8080
CMD ["/hello-world"]
