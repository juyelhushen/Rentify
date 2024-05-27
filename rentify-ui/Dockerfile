# Stage 1: Build the Angular application
FROM node:20.10.0 AS build

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json
COPY package.json package-lock.json ./
RUN npm install -g @angular/cli
# Install dependencies
RUN npm install

# Copy the rest of the application source code
COPY . .
# Build the application
RUN npm run build --configuration=production


# Expose the port http-server will serve on
EXPOSE 4200

# Start http-server to serve the application
CMD ["ng", "serve", "--host", "0.0.0.0"]
