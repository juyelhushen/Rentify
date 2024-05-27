# Use a base image with JDK
FROM openjdk:17-alpine

# Add a volume to store logs
VOLUME /tmp

# Copy the JAR file from the target directory to the container
COPY target/rentify.jar rentify.jar

# Expose the port the app runs on
EXPOSE 8081

# Run the JAR file
ENTRYPOINT ["java", "-jar", "/rentify.jar"]
