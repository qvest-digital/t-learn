# STAGE 1: build app
FROM openjdk:8 AS build

WORKDIR /e2e-tests

# Copies and prepares gradle stuff
COPY gradlew .
ADD gradle gradle

# Copies the project
COPY build.gradle .
ADD src src

ENV GRADLE_USER_HOME=/e2e-tests/gradle-home
RUN ./gradlew configureChromeDriverBinary configureGeckoDriverBinary compileTestGroovy

FROM ubuntu:bionic AS run

WORKDIR /e2e-tests

# Sets up repo for google chrome
RUN apt-get update -y && apt-get install -y wget gnupg2
RUN wget -q -O - https://dl.google.com/linux/linux_signing_key.pub | apt-key add -
RUN echo 'deb http://dl.google.com/linux/chrome/deb/ stable main' > /etc/apt/sources.list.d/google-chrome.list

RUN apt-get update -y && \
	apt-get install -y openjdk-11-jdk-headless firefox google-chrome-stable

COPY --from=build /e2e-tests .

ENV GRADLE_USER_HOME=/e2e-tests/gradle-home
ENV DISPLAY=:0

ARG FRONTEND_URL

ENTRYPOINT ["sh","/e2e-tests/gradlew", "firefoxHeadlessTest", "chromeHeadlessTest" ]
