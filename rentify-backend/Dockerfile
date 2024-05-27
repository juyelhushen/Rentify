ARG APP_NAME="rentify"
ARG APP_VERSION="0.0.1"
ARG JAR_FILE="./target/${APP_NAME}.jar"

FROM openjdk:17-alpine
EXPOSE 5000

COPY ${JAR_FILE} app.jar
LABEL authors="Juyel"

ENTRYPOINT ["java", "-jar", "app.jar"]