
FROM node:18-bullseye


WORKDIR /app


RUN apt-get update && apt-get install -y --no-install-recommends \
    wget \
    gnupg \
    ca-certificates \
    procps \
    libxss1 \
    libnss3 \
    libatk-bridge2.0-0 \
    libdrm2 \
    libxkbcommon0 \
    libxcomposite1 \
    libxdamage1 \
    libxrandr2 \
    libgbm1 \
    libasound2 \
    libxshmfence1 \
    libgtk-3-0 \
    libx11-xcb1 \
    libxcb-dri3-0 \
    openjdk-11-jre-headless \
    && rm -rf /var/lib/apt/lists/*

COPY package*.json ./


RUN npm ci


RUN npx playwright install --with-deps


COPY . .


RUN mkdir -p allure-results allure-report test-results playwright-report


ENV CI=true


EXPOSE 8080


CMD ["npm", "test"]

