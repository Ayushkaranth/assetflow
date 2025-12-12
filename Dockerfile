# 1. Base Image (Node 20 is required for Next.js 16)
FROM node:20-alpine

# 2. Set Directory
WORKDIR /app

# 3. Copy Dependencies
COPY package*.json ./

# 4. Install Dependencies
RUN npm install --legacy-peer-deps

# 5. Copy Source
COPY . .

# 6. DISABLE TELEMETRY & LINTING (Critical for CI/CD)
ENV NEXT_TELEMETRY_DISABLED=1
ENV NEXT_IGNORE_ESLINT=1
ENV NEXT_IGNORE_TYPE_CHECKS=1

# 7. Build App (Standard Command)
RUN npm run build -- --webpack

# 8. Expose & Start
EXPOSE 3000
CMD ["npm", "start"]